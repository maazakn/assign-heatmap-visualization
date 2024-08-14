import '@/styles/globals.css';
import type { Metadata } from 'next';
import AllProviders from '@/providers';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Heatmap Visualization | Demo',
  description: 'Heatmap Visualization Demo Developed By Maaz Ahmed',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <AllProviders> {children}</AllProviders>
      </body>
    </html>
  );
}
