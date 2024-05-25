'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="bg-primary text-secondary p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <nav>
          {status === 'authenticated' ? (
            <div className="flex items-center space-x-4">
              <span>Hello, {session?.user?.email} 😊</span>
              <button
                onClick={() => signOut()}
                className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
