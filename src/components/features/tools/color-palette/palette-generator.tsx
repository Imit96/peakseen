'use client';

import { useState, useCallback } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const industries = [
  'Tech',
  'Fashion',
  'Food & Beverage',
  'Health',
  'Finance',
  'Education',
  'Creative',
  'Other',
] as const;

const moodOptions = [
  'Bold',
  'Calm',
  'Energetic',
  'Luxurious',
  'Playful',
  'Trustworthy',
  'Natural',
  'Innovative',
  'Minimal',
  'Warm',
] as const;

type Industry = (typeof industries)[number];
type Mood = (typeof moodOptions)[number];

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface PaletteSwatch {
  hex: string;
  name: string;
  role: 'Primary' | 'Secondary' | 'Accent' | 'Background' | 'Text';
  contrastOnWhite: number;
  contrastOnBlack: number;
}

/* -------------------------------------------------------------------------- */
/*  Colour helpers (all work in HSL then convert to hex)                       */
/* -------------------------------------------------------------------------- */

/** Convert HSL (h 0-360, s 0-100, l 0-100) to hex. */
function hslToHex(h: number, s: number, l: number): string {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (hNorm < 60) {
    r = c; g = x; b = 0;
  } else if (hNorm < 120) {
    r = x; g = c; b = 0;
  } else if (hNorm < 180) {
    r = 0; g = c; b = x;
  } else if (hNorm < 240) {
    r = 0; g = x; b = c;
  } else if (hNorm < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/** Parse hex to sRGB linear channel for relative luminance. */
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

/** Relative luminance per WCAG 2.1. */
function relativeLuminance(hex: string): number {
  const mapped = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const r = mapped[0] ?? 0;
  const g = mapped[1] ?? 0;
  const b = mapped[2] ?? 0;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two hex colours, rounded to 2dp. */
function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

/** Choose white or black text for legibility on a given background. */
function getContrastText(hex: string): string {
  const lum = relativeLuminance(hex);
  return lum > 0.179 ? '#1A1A1A' : '#FFFFFF';
}

/* -------------------------------------------------------------------------- */
/*  Colour naming (approximate)                                                */
/* -------------------------------------------------------------------------- */

function nameColour(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2 / 255;

  if (l > 0.93) return 'Snow White';
  if (l > 0.85) return 'Soft Ivory';
  if (l < 0.08) return 'Jet Black';
  if (l < 0.15) return 'Obsidian';

  const sat = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1)) / 255;
  if (sat < 0.1) {
    if (l > 0.7) return 'Silver Mist';
    if (l > 0.4) return 'Stone Grey';
    return 'Charcoal';
  }

  let h = 0;
  const delta = max - min;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const lightness = l > 0.65 ? 'Light' : l < 0.35 ? 'Deep' : '';
  const prefix = lightness ? `${lightness} ` : '';

  if (h < 15) return `${prefix}Crimson`;
  if (h < 30) return `${prefix}Vermillion`;
  if (h < 45) return `${prefix}Amber`;
  if (h < 60) return `${prefix}Gold`;
  if (h < 75) return `${prefix}Lime`;
  if (h < 105) return `${prefix}Chartreuse`;
  if (h < 135) return `${prefix}Emerald`;
  if (h < 165) return `${prefix}Jade`;
  if (h < 195) return `${prefix}Teal`;
  if (h < 220) return `${prefix}Azure`;
  if (h < 250) return `${prefix}Cobalt`;
  if (h < 280) return `${prefix}Violet`;
  if (h < 310) return `${prefix}Orchid`;
  if (h < 340) return `${prefix}Rose`;
  return `${prefix}Ruby`;
}

/* -------------------------------------------------------------------------- */
/*  Palette generation algorithm                                               */
/* -------------------------------------------------------------------------- */

/** Simple seeded pseudo-random number generator (mulberry32). */
function createRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Map a mood word to a base hue range [min, max]. */
const MOOD_HUE_RANGES: Record<Mood, [number, number]> = {
  Bold: [0, 25],
  Calm: [185, 220],
  Energetic: [30, 55],
  Luxurious: [270, 310],
  Playful: [320, 360],
  Trustworthy: [200, 230],
  Natural: [90, 150],
  Innovative: [240, 275],
  Minimal: [0, 360],
  Warm: [15, 45],
};

/** Map industry to a hue nudge. */
const INDUSTRY_HUE_OFFSET: Record<Industry, number> = {
  Tech: 210,
  Fashion: 330,
  'Food & Beverage': 30,
  Health: 140,
  Finance: 215,
  Education: 195,
  Creative: 290,
  Other: 0,
};

function generatePalette(
  industry: Industry,
  moods: Mood[],
  randomSeed: number
): PaletteSwatch[] {
  const rng = createRng(randomSeed);

  // Determine base hue from moods
  let hueMin = 0;
  let hueMax = 360;

  if (moods.length > 0) {
    // Average the hue ranges of selected moods
    let totalMin = 0;
    let totalMax = 0;
    for (const mood of moods) {
      const [lo, hi] = MOOD_HUE_RANGES[mood];
      totalMin += lo;
      totalMax += hi;
    }
    hueMin = totalMin / moods.length;
    hueMax = totalMax / moods.length;
  }

  // Blend with industry offset
  const industryHue = INDUSTRY_HUE_OFFSET[industry] || 0;
  const moodMidHue = (hueMin + hueMax) / 2;
  const baseHue = industry
    ? (moodMidHue * 0.65 + industryHue * 0.35 + rng() * 20 - 10) % 360
    : (moodMidHue + rng() * (hueMax - hueMin)) % 360;

  // Choose harmony type based on mood combination
  const hasBold = moods.includes('Bold') || moods.includes('Energetic');
  const hasCalm = moods.includes('Calm') || moods.includes('Minimal');

  // Primary colour: vivid, mid-lightness
  const primaryHue = (baseHue + rng() * 10 - 5 + 360) % 360;
  const primarySat = hasBold ? 70 + rng() * 20 : hasCalm ? 35 + rng() * 20 : 55 + rng() * 20;
  const primaryLit = 42 + rng() * 12;

  // Secondary: shifted hue, slightly desaturated
  const secondaryShift = hasBold ? 150 + rng() * 60 : 30 + rng() * 40;
  const secondaryHue = (primaryHue + secondaryShift) % 360;
  const secondarySat = primarySat * (0.6 + rng() * 0.25);
  const secondaryLit = 38 + rng() * 16;

  // Accent: complementary pop
  const accentShift = 120 + rng() * 60;
  const accentHue = (primaryHue + accentShift) % 360;
  const accentSat = 65 + rng() * 25;
  const accentLit = 50 + rng() * 10;

  // Background: very light, tinted with primary hue
  const bgHue = primaryHue;
  const bgSat = 8 + rng() * 12;
  const bgLit = 95 + rng() * 3;

  // Text: very dark, tinted slightly with primary
  const textHue = primaryHue;
  const textSat = 8 + rng() * 12;
  const textLit = 10 + rng() * 6;

  // Build swatches
  const primaryHex = hslToHex(primaryHue, primarySat, primaryLit);
  const secondaryHex = hslToHex(secondaryHue, secondarySat, secondaryLit);
  const accentHex = hslToHex(accentHue, accentSat, accentLit);
  const bgHex = hslToHex(bgHue, bgSat, bgLit);
  const textHex = hslToHex(textHue, textSat, textLit);

  // Ensure text-on-background contrast >= 4.5:1
  // If not, darken text
  let finalTextHex = textHex;
  let attempts = 0;
  while (contrastRatio(finalTextHex, bgHex) < 4.5 && attempts < 20) {
    const currentLit = 10 + rng() * 4 - attempts * 1.5;
    finalTextHex = hslToHex(textHue, textSat, Math.max(3, currentLit));
    attempts++;
  }
  // Fallback to near-black if still insufficient
  if (contrastRatio(finalTextHex, bgHex) < 4.5) {
    finalTextHex = '#121212';
  }

  const swatches: PaletteSwatch[] = [
    {
      hex: primaryHex,
      name: nameColour(primaryHex),
      role: 'Primary',
      contrastOnWhite: contrastRatio(primaryHex, '#FFFFFF'),
      contrastOnBlack: contrastRatio(primaryHex, '#000000'),
    },
    {
      hex: secondaryHex,
      name: nameColour(secondaryHex),
      role: 'Secondary',
      contrastOnWhite: contrastRatio(secondaryHex, '#FFFFFF'),
      contrastOnBlack: contrastRatio(secondaryHex, '#000000'),
    },
    {
      hex: accentHex,
      name: nameColour(accentHex),
      role: 'Accent',
      contrastOnWhite: contrastRatio(accentHex, '#FFFFFF'),
      contrastOnBlack: contrastRatio(accentHex, '#000000'),
    },
    {
      hex: bgHex,
      name: nameColour(bgHex),
      role: 'Background',
      contrastOnWhite: contrastRatio(bgHex, '#FFFFFF'),
      contrastOnBlack: contrastRatio(bgHex, '#000000'),
    },
    {
      hex: finalTextHex,
      name: nameColour(finalTextHex),
      role: 'Text',
      contrastOnWhite: contrastRatio(finalTextHex, '#FFFFFF'),
      contrastOnBlack: contrastRatio(finalTextHex, '#000000'),
    },
  ];

  return swatches;
}

/* -------------------------------------------------------------------------- */
/*  SVG export                                                                 */
/* -------------------------------------------------------------------------- */

function buildPaletteSvg(swatches: PaletteSwatch[]): string {
  const swatchWidth = 160;
  const swatchHeight = 200;
  const padding = 16;
  const totalWidth = swatches.length * swatchWidth + (swatches.length - 1) * padding;
  const totalHeight = swatchHeight + 60;

  const swatchElements = swatches
    .map((swatch, i) => {
      const x = i * (swatchWidth + padding);
      const textFill = getContrastText(swatch.hex);
      return `
    <rect x="${x}" y="0" width="${swatchWidth}" height="${swatchHeight}" rx="12" fill="${swatch.hex}" />
    <text x="${x + swatchWidth / 2}" y="${swatchHeight - 16}" text-anchor="middle" fill="${textFill}" font-family="monospace" font-size="13">${swatch.hex}</text>
    <text x="${x + swatchWidth / 2}" y="${swatchHeight + 24}" text-anchor="middle" fill="#1A1A1A" font-family="sans-serif" font-size="13" font-weight="600">${swatch.name}</text>
    <text x="${x + swatchWidth / 2}" y="${swatchHeight + 44}" text-anchor="middle" fill="#888" font-family="sans-serif" font-size="11">${swatch.role}</text>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
  <rect width="${totalWidth}" height="${totalHeight}" fill="#F9F8F6" rx="0" />
  ${swatchElements}
</svg>`;
}

function downloadSvg(svgContent: string, filename: string) {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function PaletteGenerator() {
  const [industry, setIndustry] = useState('');
  const [moods, setMoods] = useState<Mood[]>([]);
  const [palette, setPalette] = useState<PaletteSwatch[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleMoodToggle = useCallback((mood: Mood) => {
    setMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsGenerating(true);
    setPalette(null);

    // Brief delay for perceived effort
    setTimeout(() => {
      const randomSeed = Date.now() ^ (Math.random() * 0xffffffff);
      const generated = generatePalette(
        (industry as Industry) || 'Other',
        moods.length > 0 ? moods : ['Innovative'],
        randomSeed
      );
      setPalette(generated);
      setIsGenerating(false);
    }, 500);
  }

  async function handleCopyAll() {
    if (!palette) return;
    const hexCodes = palette.map((s) => s.hex).join('\n');
    try {
      await navigator.clipboard.writeText(hexCodes);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      console.error('[PaletteGenerator] Failed to copy to clipboard');
    }
  }

  function handleDownload() {
    if (!palette) return;
    const svg = buildPaletteSvg(palette);
    downloadSvg(svg, 'peakseen-palette.svg');
  }

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <FadeInOnScroll>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Industry */}
            <div>
              <label
                htmlFor="palette-industry"
                className="block font-display text-sm font-bold text-charcoal mb-2"
              >
                Industry
              </label>
              <select
                id="palette-industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={cn(
                  'h-12 w-full rounded-md border border-grey-100 bg-white px-4 py-3 text-base text-charcoal transition-colors duration-150',
                  'focus:border-accent focus:ring-1 focus:ring-accent focus:bg-accent-subtle/50',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Mood Words */}
            <div>
              <p className="block font-display text-sm font-bold text-charcoal mb-3">
                Mood Words
              </p>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((mood) => {
                  const isSelected = moods.includes(mood);
                  return (
                    <label
                      key={mood}
                      className={cn(
                        'inline-flex items-center gap-2 cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-150',
                        isSelected
                          ? 'border-accent bg-accent-subtle/50 text-accent'
                          : 'border-grey-100 bg-white text-grey-600 hover:border-grey-200'
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isSelected}
                        onChange={() => handleMoodToggle(mood)}
                      />
                      {mood}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isGenerating}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Palette \u2192'}
            </Button>
          </form>
        </FadeInOnScroll>

        {/* Loading skeleton */}
        {isGenerating && (
          <div className="mt-12">
            <div className="h-7 w-48 rounded-md bg-grey-100 animate-pulse mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-square rounded-xl bg-grey-100 animate-pulse" />
                  <div className="h-4 w-16 rounded bg-grey-100 animate-pulse" />
                  <div className="h-3 w-12 rounded bg-grey-100 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Palette Results */}
        {palette && !isGenerating && (
          <div className="mt-12">
            <FadeInOnScroll>
              <h2 className="font-display text-xl font-bold text-charcoal mb-8">
                Your Brand Palette
              </h2>
            </FadeInOnScroll>

            {/* Swatches */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
              {palette.map((swatch, index) => (
                <FadeInOnScroll key={`${swatch.hex}-${swatch.role}`} delay={index * 0.1}>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-full aspect-square rounded-xl shadow-sm mb-3 flex items-end justify-center pb-3"
                      style={{ backgroundColor: swatch.hex }}
                    >
                      <span
                        className="font-mono text-xs font-medium"
                        style={{ color: getContrastText(swatch.hex) }}
                      >
                        {swatch.hex}
                      </span>
                    </div>
                    <p className="font-display text-sm font-bold text-charcoal">
                      {swatch.name}
                    </p>
                    <p className="text-xs text-grey-500 mb-2">{swatch.role}</p>
                    <div className="flex flex-col items-center gap-0.5 text-[10px] font-mono text-grey-400">
                      <span
                        className={cn(
                          swatch.contrastOnWhite >= 4.5 ? 'text-emerald-600' : 'text-grey-400'
                        )}
                      >
                        vs white: {swatch.contrastOnWhite}:1
                      </span>
                      <span
                        className={cn(
                          swatch.contrastOnBlack >= 4.5 ? 'text-emerald-600' : 'text-grey-400'
                        )}
                      >
                        vs black: {swatch.contrastOnBlack}:1
                      </span>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>

            {/* Action Buttons */}
            <FadeInOnScroll delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleCopyAll}
                >
                  {hasCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All Hex Codes
                    </>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Palette
                </Button>
              </div>
            </FadeInOnScroll>
          </div>
        )}
      </div>
    </Section>
  );
}
