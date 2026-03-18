'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'peakseen-cookies-consent';

function setAnalyticsOptOut(declined: boolean) {
  if (typeof window !== 'undefined') {
    // Vercel Analytics respects the va-disable cookie for opt-out
    if (declined) {
      document.cookie = 'va-disable=true;path=/;max-age=31536000;samesite=lax';
    } else {
      document.cookie = 'va-disable=;path=/;max-age=0';
    }
  }
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'declined') {
      setAnalyticsOptOut(true);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setAnalyticsOptOut(false);
    setIsVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setAnalyticsOptOut(true);
    setIsVisible(false);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-grey-700 bg-charcoal p-4 text-ivory lg:p-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-grey-300">
          We use cookies and analytics to improve your experience. You can accept or decline.
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAccept}
          >
            Accept
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-ivory hover:text-ivory hover:bg-grey-700"
            onClick={handleDecline}
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
