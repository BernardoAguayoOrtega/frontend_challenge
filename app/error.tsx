'use client';

import { useEffect } from 'react';
import Button from './components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
      <Button onClick={() => reset()} text="Try again" />
    </div>
  );
}
