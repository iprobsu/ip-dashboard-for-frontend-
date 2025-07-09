// components/SideNav.tsx
'use client';
import { HomeIcon, ArchiveBoxIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SideNav() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
      <nav className="p-4 space-y-2">
        <Link href="/" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-gray-700">
          <HomeIcon className="w-5 h-5" />
          Dashboard
        </Link>
        <Link href="/archives" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-gray-700">
          <ArchiveBoxIcon className="w-5 h-5" />
          Archives
        </Link>
        <Link href="/settings" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-gray-700">
          <Cog6ToothIcon className="w-5 h-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
