import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { JotaiProvider } from '@/providers/JotaiProvider';
import { Nav } from '@/components/Nav';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'my-context — GitHub Copilot Instruction Generator',
  description:
    'Generate a complete set of GitHub Copilot instruction files for your project.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JotaiProvider>
          <Nav />
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}
