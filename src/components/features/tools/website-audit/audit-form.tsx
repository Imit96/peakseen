'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MOTION } from '@/lib/constants';
import Link from 'next/link';

interface AuditCategory {
  name: string;
  score: number;
  status: 'good' | 'fair' | 'needs-work';
  findings: string[];
}

interface AuditResult {
  overallScore: number;
  summary: string;
  categories: AuditCategory[];
}

export function AuditForm() {
  const [url, setUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAudit(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    
    // Auto-add https if missing
    let targetUrl = url;
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
      setUrl(targetUrl);
    }

    setIsAuditing(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/tools/website-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to scan website.');
      }

      setResult(data.audit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsAuditing(false);
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'good':
        return <CheckCircle2 className="h-5 w-5 text-success shrink-0" />;
      case 'fair':
        return <AlertCircle className="h-5 w-5 text-warning shrink-0" />;
      case 'needs-work':
      default:
        return <XCircle className="h-5 w-5 text-error shrink-0" />;
    }
  }

  function getScoreColor(score: number) {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  }

  return (
    <div className="w-full">
      {/* Input Form */}
      <Card className="p-2 bg-white/50 backdrop-blur-md border-grey-200">
        <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-400" />
            <Input
              type="text"
              placeholder="acme-studio.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 h-12 border-0 bg-transparent ring-0 focus-visible:ring-0 text-base"
              disabled={isAuditing}
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            isLoading={isAuditing}
            disabled={!url || isAuditing}
            className="shrink-0"
          >
            {isAuditing ? (
              'Scanning...'
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Run Audit
              </>
            )}
          </Button>
        </form>
      </Card>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-error-light border border-error text-error text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: MOTION.duration.normal }}
            className="mt-12 space-y-8"
          >
            {/* Header Score */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center h-32 w-32 rounded-full border-8 border-accent-subtle bg-white shadow-sm">
                <span className={cn('font-display text-5xl font-black', getScoreColor(result.overallScore))}>
                  {result.overallScore}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-charcoal">Overall Score</h3>
                <p className="font-body text-grey-600 mt-2 max-w-2xl mx-auto">{result.summary}</p>
              </div>
            </div>

            {/* Categories */}
            <div className="grid gap-6">
              {result.categories.map((category, i) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Card className="p-6 overflow-hidden relative">
                    {/* Background accent line based on status */}
                    <div className={cn(
                      'absolute left-0 top-0 bottom-0 w-1',
                      category.status === 'good' && 'bg-success',
                      category.status === 'fair' && 'bg-warning',
                      category.status === 'needs-work' && 'bg-error'
                    )} />
                    
                    <div className="pl-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(category.status)}
                          <h4 className="font-display text-lg font-bold text-charcoal">{category.name}</h4>
                        </div>
                        <span className={cn('font-bold', getScoreColor(category.score))}>
                          {category.score}/100
                        </span>
                      </div>
                      
                      <ul className="space-y-2 mt-4 text-sm text-grey-600">
                        {category.findings.map((finding, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-grey-400 mt-1">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 text-center border-t border-grey-200">
              <h4 className="font-display text-xl font-bold text-charcoal mb-4">Want a deeper analysis?</h4>
              <p className="text-grey-600 max-w-lg mx-auto mb-6">
                Our free AI audit covers the basics. For a comprehensive human review + actionable strategy, get your custom Brand Report.
              </p>
              <Link href="/brand-report" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
                Get my Free Brand Report →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
