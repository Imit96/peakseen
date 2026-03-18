'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal">
      <div className="flex h-16 items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold text-ivory"
          onClick={onClose}
        >
          PEAKSEEN
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-6 w-6 text-ivory" />
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center gap-8 pt-16">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-display text-2xl font-medium text-ivory/80 transition-colors hover:text-accent"
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/start"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 font-display text-sm font-bold tracking-[0.02em] text-white transition-all duration-150 hover:bg-accent-hover hover:shadow-accent active:scale-[0.98]"
          onClick={onClose}
        >
          Start a Project
        </Link>
      </nav>
    </div>
  );
}
