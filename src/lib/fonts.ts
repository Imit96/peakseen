import localFont from 'next/font/local';

// Satoshi variable font — self-hosted from Satoshi_Complete package
export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  weight: '300 900',
});

// Libre Baskerville — editorial serif used as body font (--font-body)
// Substitute for Editorial New. Variable TTF covers all weights.
export const libreBaskerville = localFont({
  src: [
    {
      path: '../../public/fonts/Libre_Baskerville/LibreBaskerville-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Libre_Baskerville/LibreBaskerville-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-body',
  display: 'swap',
  weight: '400 700',
});

// JetBrains Mono — self-hosted from JetBrainsMono-2 package
export const jetbrainsMono = localFont({
  src: [
    {
      path: '../../public/fonts/JetBrainsMono-2/fonts/webfonts/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/JetBrainsMono-2/fonts/webfonts/JetBrainsMono-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/JetBrainsMono-2/fonts/webfonts/JetBrainsMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});
