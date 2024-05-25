import type { Metadata } from 'next';
import './globals.css';
import SessionProviderWrapper from './components/SessionProviderWrapper';
import Header from './components/Header';

export const metadata: Metadata = {
  title: 'Movie List App',
  description: "Bernardo's Movie List App",
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
            <main className="flex-grow">{children}</main>
            <footer className="bg-primary text-secondary p-4 text-center">
              © 2023 My App
            </footer>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
