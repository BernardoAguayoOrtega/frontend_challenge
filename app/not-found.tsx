'use client';

import Link from 'next/link';
import Button from './components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black to-gray-800 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link href="/">
        <Button text="Go back home" />
      </Link>
    </div>
  );
};

export default NotFoundPage;
