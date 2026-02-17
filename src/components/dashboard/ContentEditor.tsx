'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Globe } from 'lucide-react';

interface ContentEditorProps {
  section: string; // e.g., "Index.nav", "Index.about"
  title: string;
}

export default function ContentEditor({ section, title }: ContentEditorProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeLocale, setActiveLocale] = useState('id');

  useEffect(() => {
    fetchContent();
  }, [activeLocale]);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/content?locale=${activeLocale}`);
      const json = await res.json();
      
      // Extract the specific section
      const keys = section.split('.');
      let current = json;
      for (const key of keys) {
        if (current && current[key]) {
          current = current[key];
        } else {
          current = null;
          break;
        }
      }
      
      setData(current || {});
    } catch (error) {
      console.error('Failed to fetch content', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: activeLocale,
          section,
          data
        })
      });
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Failed to save content', error);
      alert('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = (path: string[], value: string) => {
    const newData = { ...data };
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setData(newData);
  };

  const renderFields = (obj: any, path: string[] = []) => {
    if (!obj) return null;

    return Object.entries(obj).map(([key, value]) => {
      const currentPath = [...path, key];
      
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} className="mb-6 ml-4 border-l-2 border-gray-100 pl-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">{key}</h3>
            {renderFields(value, currentPath)}
          </div>
        );
      }

      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          {key.toLowerCase().includes('desc') || key.toLowerCase().includes('content') || (typeof value === 'string' && value.length > 50) ? (
            <textarea
              value={value as string}
              onChange={(e) => handleFieldChange(currentPath, e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue text-sm px-4 py-2"
              rows={4}
            />
          ) : (
            <input
              type="text"
              value={value as string}
              onChange={(e) => handleFieldChange(currentPath, e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue text-sm px-4 py-2"
            />
          )}
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-faji-blue" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">Edit content for {activeLocale === 'id' ? 'Indonesian' : 'English'} version</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveLocale('id')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeLocale === 'id' ? 'bg-white text-faji-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setActiveLocale('en')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeLocale === 'en' ? 'bg-white text-faji-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-faji-blue text-white rounded-lg hover:bg-faji-blue/90 disabled:opacity-70 transition-colors shadow-sm"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>

      <div className="p-6">
        {renderFields(data)}
      </div>
    </div>
  );
}