'use client';

import ContentEditor from '@/components/dashboard/ContentEditor';
import { LayoutTemplate } from 'lucide-react';

export default function FooterManager() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Footer</h1>
          <p className="text-gray-500 mt-1">Customize the footer content, contact info, and social links.</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation for Sections */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-8">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4" />
                Sections
              </h3>
            </div>
            <nav className="p-2 space-y-1">
              <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-faji-blue text-white shadow-md transition-colors">
                Footer Content
              </button>
            </nav>
          </div>
        </div>

        {/* Content Editor Area */}
        <div className="flex-1">
          <ContentEditor section="Index.footer" title="Footer Details" />
        </div>
      </div>
    </div>
  );
}