'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const withProtectedRoute = (WrappedComponent: React.FC<any>) => {
  const ComponentWithProtection: React.FC<any> = (props) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/');
      }
    }, [status, router]);

    if (status === 'loading') {
      return <div>Loading...</div>; // Or any loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithProtection;
};

export default withProtectedRoute;
