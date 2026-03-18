import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// Convenience alias for backward compatibility
export const resend = {
  emails: {
    send: async (options: Parameters<Resend['emails']['send']>[0]) => {
      return getResend().emails.send(options);
    },
  },
};
