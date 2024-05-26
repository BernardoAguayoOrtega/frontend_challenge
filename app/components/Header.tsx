'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
              <button
                onClick={() => signOut()}
                className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 md:mt-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 md:mt-0"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 md:mt-0"
              >
                Signup
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
