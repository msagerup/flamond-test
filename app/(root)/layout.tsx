import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Flamond',
  description: 'Affordable, luxurious jewellery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={inter.className}>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <div className='flex-grow my-10 container'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
