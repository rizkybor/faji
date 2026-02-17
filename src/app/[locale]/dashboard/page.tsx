'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, FileText, Newspaper, TrendingUp, ArrowUpRight, ArrowDownRight, Edit } from 'lucide-react';
import { Link } from '@/navigation';

export default function DashboardPage() {
  const t = useTranslations('Dashboard.overview');

  const stats = [
    {
      label: t('stats.visitors'),
      value: "2,543",
      change: "+12.5%",
      isPositive: true,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      label: t('stats.posts'),
      value: "45",
      change: "+5.2%",
      isPositive: true,
      icon: Newspaper,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      label: t('stats.members'),
      value: "128",
      change: "-2.4%",
      isPositive: false,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      label: "System Pages",
      value: "5",
      change: "Active",
      isPositive: true,
      icon: FileText,
      color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('welcome')}</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your website today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" target="_blank" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            View Website
          </Link>
          <Link href="/dashboard/pages" className="px-4 py-2 bg-faji-blue text-white rounded-lg text-sm font-medium hover:bg-faji-blue/90 transition-colors shadow-sm">
            Manage Content
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/dashboard/navigation" className="p-4 rounded-lg border border-gray-100 hover:border-faji-blue/30 hover:bg-blue-50 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">Add Page</span>
              </div>
              <p className="text-xs text-gray-500">Create a new page via Navigation menu.</p>
            </Link>
            
            <Link href="/dashboard/pages" className="p-4 rounded-lg border border-gray-100 hover:border-faji-blue/30 hover:bg-blue-50 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Edit className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">Edit Content</span>
              </div>
              <p className="text-xs text-gray-500">Update homepage, about, or other sections.</p>
            </Link>
          </div>
        </div>

        {/* Recent Updates (Mock) */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Updates</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { action: "Updated Hero Section", user: "Admin", time: "2 hours ago" },
              { action: "Added 'Privacy Policy' page", user: "Admin", time: "5 hours ago" },
              { action: "Modified Footer Links", user: "Admin", time: "1 day ago" }
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">by {item.user}</p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}