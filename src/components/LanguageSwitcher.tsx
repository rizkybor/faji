'use client';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/navigation';
import {ChangeEvent, useTransition, useState, useEffect} from 'react';
import { Globe } from 'lucide-react';
import clsx from 'clsx';

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale as any});
    });
  };

  return (
    <div className="relative group">
      <div className={clsx(
        "flex items-center gap-2 border rounded-full px-3 py-1.5 transition-colors",
        isScrolled 
          ? "bg-gray-100 border-gray-200 hover:bg-gray-200" 
          : "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
      )}>
        <Globe className={clsx("w-4 h-4", isScrolled ? "text-faji-blue" : "text-faji-green")} />
        <select
          defaultValue={locale}
          disabled={isPending}
          onChange={handleChange}
          className={clsx(
            "bg-transparent text-sm font-medium focus:outline-none appearance-none cursor-pointer",
            isScrolled ? "text-gray-700" : "text-white"
          )}
          style={{ color: 'inherit' }}
        >
          <option value="id" className="text-black">ID</option>
          <option value="en" className="text-black">EN</option>
        </select>
      </div>
    </div>
  );
}
