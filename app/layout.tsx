import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import LeftSideBar from './components/leftSidebar/LeftSideBar';

export const metadata = {
  title: 'Isnad | Hadith Collection',
  description:
    'A collection of Hadiths from Sahih Bukhari, Sahih Muslim, Sunan Abu Dawud, Sunan Ibn Majah, Sunan al-Tirmidhi, and Sunan al-Nasa’i.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>

        <LeftSideBar>{children}</LeftSideBar>
        <span className="text-gray-700 text-[12px] absolute bottom-[-10px] left-0 ml-3 mb-3">
          Data provided from <a href="https://sunnah.com/">sunnah.com</a>
        </span>
        <Analytics />
        <Toast />
      </body>
    </html>
  );
}
