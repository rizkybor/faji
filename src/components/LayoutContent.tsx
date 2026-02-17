'use client';

import { usePathname } from '@/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navigation and Footer on login and dashboard pages
  const isDashboardOrLogin = pathname === '/login' || pathname.startsWith('/dashboard');

  if (isDashboardOrLogin) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}