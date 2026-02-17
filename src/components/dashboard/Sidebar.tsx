'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { 
  LayoutGrid, // Replaced LayoutDashboard
  FileText, 
  Menu as MenuIcon, // Replaced FileText for Navigation
  LayoutTemplate, // Replaced FileText for Footer
  User, // For Profile
  Settings, 
  LogOut, 
  X
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const t = useTranslations('Dashboard.nav');
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear dummy auth cookie
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/login');
  };

  const mainMenuItems = [
    { href: '/dashboard', label: t('overview'), icon: LayoutGrid },
    { href: '/dashboard/pages', label: t('pages'), icon: FileText },
    { href: '/dashboard/navigation', label: 'Navigation', icon: MenuIcon },
    { href: '/dashboard/footer', label: 'Footer', icon: LayoutTemplate },
  ];

  const settingsMenuItems = [
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings', label: t('settings'), icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-50">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/images/logos/logo.png"
              alt="FAJI Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">FAJI Admin</span>
        </Link>
        <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          {mainMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-faji-blue/10 text-faji-blue shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-faji-blue" : "text-gray-400")} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Settings
          </p>
          {settingsMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-faji-blue/10 text-faji-blue shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-faji-blue" : "text-gray-400")} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t('logout')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}