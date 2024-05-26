'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faSearch,
  faThList,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed md:top-0 md:left-0 bottom-0 md:h-full w-full md:w-20 flex md:flex-col bg-gradient-to-r from-black to-gray-900 shadow-lg z-10 justify-center py-2 md:py-8">
      <div className="flex md:flex-col items-center justify-around w-full md:space-y-40 space-x-8 md:space-x-0">
        <Link href="/">
          <span
            className={`sidebar-icon ${isActive('/') ? 'text-green-500' : 'text-white'}`}
          >
            <FontAwesomeIcon icon={faHome} size="xl" />
          </span>
        </Link>
        <Link href="/favorites">
          <span
            className={`sidebar-icon ${isActive('/favorites') ? 'text-green-500' : 'text-white'}`}
          >
            <FontAwesomeIcon icon={faHeart} size="xl" />
          </span>
        </Link>
        <Link href="/search">
          <span
            className={`sidebar-icon ${isActive('/search') ? 'text-green-500' : 'text-white'}`}
          >
            <FontAwesomeIcon icon={faSearch} size="xl" />
          </span>
        </Link>
        <Link href="/categories">
          <span
            className={`sidebar-icon ${isActive('/categories') ? 'text-green-500' : 'text-white'}`}
          >
            <FontAwesomeIcon icon={faThList} size="xl" />
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
