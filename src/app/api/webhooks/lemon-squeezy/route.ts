import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerClient } from '@/lib/supabase-server';
import { resend } from '@/lib/email';
import { PurchaseConfirmation } from '@/emails/purchase-confirmation';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-signature');
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 401 }
      );
    }

    const rawBody = await req.text();

    // Verify HMAC-SHA256 signature
    const hash = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

    if (hash !== signature) {
      console.error('[Lemon Squeezy Webhook] Signature verification failed');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody) as {
      meta?: {
        event_name?: string;
        custom_data?: Record<string, unknown>;
      };
      data?: {
        id?: string;
        attributes?: {
          status?: string;
          first_order_item?: {
            product_name?: string;
            variant_name?: string;
          };
          total?: number;
          currency?: string;
          user_email?: string;
          user_name?: string;
          urls?: {
            receipt?: string;
          };
        };
      };
    };

    const eventName = payload.meta?.event_name;
    const data = payload.data;

    const supabase = createServerClient();

    switch (eventName) {
      case 'order_created': {
        const attrs = data?.attributes;
        if (attrs?.user_email) {
          const { error } = await supabase.from('orders').insert({
            lemon_squeezy_id: data?.id || null,
            email: attrs.user_email,
            name: attrs.user_name || null,
            product_name: attrs.first_order_item?.product_name || 'Unknown',
            variant_name: attrs.first_order_item?.variant_name || null,
            total: attrs.total ? attrs.total / 100 : 0,
            currency: attrs.currency || 'USD',
            status: 'paid',
            receipt_url: attrs.urls?.receipt || null,
          });

          if (error) {
            console.error('[Lemon Squeezy Webhook] Failed to save order:', error.message);
          } else {
            // Send purchase confirmation email
            try {
              await resend.emails.send({
                from: 'PeakSeen <hello@peakseen.com>',
                to: attrs.user_email,
                subject: `Your purchase receipt — ${attrs.first_order_item?.product_name || 'PeakSeen'}`,
                react: PurchaseConfirmation({
                  name: attrs.user_name || null,
                  productName: attrs.first_order_item?.product_name || 'Your order',
                  total: attrs.total ? attrs.total / 100 : 0,
                  currency: attrs.currency || 'USD',
                  receiptUrl: attrs.urls?.receipt || null,
                }),
              });
            } catch (emailErr) {
              console.error('[Lemon Squeezy Webhook] Email error:', emailErr instanceof Error ? emailErr.message : 'Unknown');
            }
          }
        }
        break;
      }
      case 'order_refunded': {
        if (data?.id) {
          const { error } = await supabase
            .from('orders')
            .update({ status: 'refunded' })
            .eq('lemon_squeezy_id', data.id);

          if (error) {
            console.error('[Lemon Squeezy Webhook] Failed to update refund:', error.message);
          }
        }
        break;
      }
      default:
        console.error(`[Lemon Squeezy Webhook] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[Lemon Squeezy Webhook] Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
