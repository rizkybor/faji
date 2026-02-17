'use client';

import { useState } from 'react';
import ContentEditor from '@/components/dashboard/ContentEditor';
import { LayoutTemplate, Home, Info, Calendar, Image as ImageIcon, Video, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PagesManager() {
  const [activePage, setActivePage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const pages = [
    { 
      id: 'home', 
      label: 'Home / Beranda', 
      icon: Home,
      sections: [
        { id: 'hero', label: 'Hero Section', sectionKey: 'Index.hero' },
        { id: 'sponsors', label: 'Sponsors Section', sectionKey: 'Index.sponsors' },
        { id: 'gallery_preview', label: 'Gallery Preview', sectionKey: 'Index.gallery' }
      ]
    },
    { 
      id: 'about', 
      label: 'About / Tentang', 
      icon: Info,
      sections: [
        { id: 'about_hero', label: 'Page Header', sectionKey: 'AboutPage.header' }, // Assuming these keys exist or will be created
        { id: 'about_content', label: 'Main Content', sectionKey: 'Index.about' },
        { id: 'about_vision', label: 'Vision & Mission', sectionKey: 'AboutPage.vision' }
      ]
    },
    { 
      id: 'program', 
      label: 'Program', 
      icon: Calendar,
      sections: [
        { id: 'program_header', label: 'Page Header', sectionKey: 'ProgramPage.header' },
        { id: 'program_list', label: 'Program List', sectionKey: 'Index.program' }
      ]
    },
    { 
      id: 'gallery', 
      label: 'Gallery', 
      icon: ImageIcon,
      sections: [
        { id: 'gallery_header', label: 'Page Header', sectionKey: 'GalleryPage.header' },
        // Gallery items might be managed differently, but text content here
      ]
    },
    { 
      id: 'live', 
      label: 'Live Stream', 
      icon: Video,
      sections: [
        { id: 'live_content', label: 'Live Page Content', sectionKey: 'LivePage' }
      ]
    }
  ];

  const selectedPage = pages.find(p => p.id === activePage);
  const selectedSections = selectedPage?.sections || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage System Pages</h1>
          <p className="text-gray-500 mt-1">Select a page to manage its sections and content.</p>
        </div>
        {activePage && (
          <button 
            onClick={() => {
              setActivePage(null);
              setActiveSection(null);
            }}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-faji-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pages List
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!activePage ? (
          /* Page Selection Grid */
          <motion.div 
            key="page-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  setActivePage(page.id);
                  setActiveSection(page.sections[0]?.id || null);
                }}
                className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-faji-blue/30 transition-all group text-center"
              >
                <div className="w-16 h-16 bg-blue-50 text-faji-blue rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <page.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-faji-blue transition-colors">{page.label}</h3>
                <p className="text-sm text-gray-500 mt-2">{page.sections.length} Sections available</p>
              </button>
            ))}
          </motion.div>
        ) : (
          /* Section Editor View */
          <motion.div 
            key="editor-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Sidebar Navigation for Sections */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-8">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4" />
                    {selectedPage?.label}
                  </h3>
                </div>
                <nav className="p-2 space-y-1">
                  {selectedSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-faji-blue text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Editor Area */}
            <div className="flex-1">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {selectedSections.map((section) => (
                  activeSection === section.id && (
                    <ContentEditor 
                      key={section.id} 
                      section={section.sectionKey} 
                      title={`${selectedPage?.label} - ${section.label}`} 
                    />
                  )
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}