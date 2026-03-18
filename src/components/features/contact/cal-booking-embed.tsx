'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export function CalBookingEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <Cal
        calLink={process.env.NEXT_PUBLIC_CAL_USERNAME ? `${process.env.NEXT_PUBLIC_CAL_USERNAME}/brand-discovery` : 'peakseen/brand-discovery'}
        config={{
          layout: 'month_view',
          theme: 'dark',
        }}
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      />
    </div>
  );
}
