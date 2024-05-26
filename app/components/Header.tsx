'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="bg-primary text-secondary p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">FinspheraFlix</h1>
        </Link>
        <nav className="mt-4 md:mt-0">
          {status === 'authenticated' ? (
            <div className="flex flex-wrap items-center space-x-4">
              <span className="block w-full md:w-auto">
                Hello, {session?.user?.email} 😊
              </span>
              <Button text="Sign Out" onClick={() => signOut()} />
            </div>
          ) : (
            <div className="flex flex-wrap items-center space-x-4">
              <Button text="Login" onClick={() => router.push('/login')} />
              <Button text="Sign Up" onClick={() => router.push('/signup')} />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
