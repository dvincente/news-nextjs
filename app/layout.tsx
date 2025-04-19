import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true
});

export const metadata: Metadata = {
  title: 'Clean Blog - Start Bootstrap Theme',
  description: 'A clean blog theme built with Next.js and Tailwind CSS',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-white bg-opacity-90 shadow">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-xl font-bold">
                Start Bootstrap
              </Link>
              <div className="space-x-6">
                <Link href="/" className="hover:text-gray-600 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="hover:text-gray-600 transition-colors">
                  About
                </Link>
                <Link href="/post" className="hover:text-gray-600 transition-colors">
                  Sample Post
                </Link>
                <Link href="/contact" className="hover:text-gray-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        {/* Footer */}
        <footer className="bg-white py-12 mt-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                GitHub
              </a>
            </div>
            <p className="text-gray-600">
              Copyright © Your Website 2023
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}