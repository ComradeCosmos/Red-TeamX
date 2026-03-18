import { DM_Mono, Inter, VT323 } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import InteractiveBackground from '@/components/InteractiveBackground';

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pixel',
});

export const metadata = {
  title: 'redteamX | Cybersecurity Club',
  description: 'The elite cybersecurity collective of PDEU',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmMono.variable} ${inter.variable} ${vt323.variable}`}>
        <Loader />
        <CustomCursor />

        <div className="bg"></div>
        <div className="stripes"></div>
        <InteractiveBackground />

        <main className="content-wrapper">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
