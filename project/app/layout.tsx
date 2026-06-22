import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Data Odyssey 2026 | Inter-University Data Science Competition & Exhibition',
  description:
    'Data Odyssey 2026 — The premier inter-university data science competition and exhibition organized by the AI & Data Science Club, General Sir John Kotelawala Defence University. Compete, innovate, and shape the future of AI in Sri Lanka.',
  keywords: ['Data Odyssey 2026', 'data science competition', 'university competition', 'Sri Lanka AI', 'KDU', 'machine learning', 'artificial intelligence'],
  authors: [{ name: 'AI & Data Science Club, KDU' }],
  openGraph: {
    title: 'Data Odyssey 2026 | Inter-University Data Science Competition',
    description: 'The premier inter-university data science competition organized by KDU. Register your team today.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Odyssey 2026',
    description: 'Inter-University Data Science Competition & Exhibition — Sri Lanka 2026',
  },
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} bg-[#050816] text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
