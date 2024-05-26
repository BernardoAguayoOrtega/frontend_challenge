'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faThList } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <aside className="fixed md:top-0 md:left-0 bottom-0 md:h-full w-full md:w-20 flex md:flex-col bg-gradient-to-r from-black to-gray-900 shadow-lg z-10 justify-center py-2 md:py-8">
      <div className="flex md:flex-col items-center justify-around w-full md:space-y-40 space-x-8 md:space-x-0">
        <Link href="/favorites">
          <span className="sidebar-icon">
            <FontAwesomeIcon icon={faHeart} size="2x" />
          </span>
        </Link>
        <Link href="/search">
          <span className="sidebar-icon">
            <FontAwesomeIcon icon={faSearch} size="2x" />
          </span>
        </Link>
        <Link href="/categories">
          <span className="sidebar-icon">
            <FontAwesomeIcon icon={faThList} size="2x" />
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
