'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      alert('Login successful!');
      router.push('/'); // Redirect to home page or another protected page
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-primary p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            className="block text-secondary text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full p-2 border border-secondary rounded bg-primary text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            className="block text-secondary text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-2 border border-secondary rounded bg-primary text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <button
            type="button"
            className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push('/signup')}
          >
            Go to Signup
          </button>
        </div>
      </form>
    </div>
  );
}
