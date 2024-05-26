import type { Metadata } from 'next';
import './globals.css';
import SessionProviderWrapper from './components/SessionProviderWrapper';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export const metadata: Metadata = {
  title: 'FinspheraFlix',
  description: 'Discover.amazing.movies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Sidebar />
            <main className="flex-grow">{children}</main>
            <footer className="text-secondary p-4 text-center">
              © 2024 FinspheraFlix
            </footer>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
