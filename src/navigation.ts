import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'always'
});

export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation(routing);