import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
      <body className="min-h-screen flex flex-col bg-primary text-secondary">
        <header className="bg-primary text-secondary py-4 shadow-md border-b border-accent">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">My Movie List</h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-primary text-secondary py-4 text-center shadow-md border-t border-accent">
          <div className="container mx-auto">
            <p>© 2024 My Movie List</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
