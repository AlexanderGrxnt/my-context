'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Shared top navigation bar linking between the Project page and the
 * Company Preferences page.
 */
const Nav = (): React.JSX.Element => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Project' },
    { href: '/preferences', label: 'Company Preferences' },
    { href: '/prompts', label: 'Prompts & Tasks' },
  ];

  return (
    <nav className="flex items-center gap-1 border-b border-zinc-200 bg-white px-4">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={[
              'px-3 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'border-b-2 border-zinc-900 text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-900',
            ].join(' ')}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export { Nav };
