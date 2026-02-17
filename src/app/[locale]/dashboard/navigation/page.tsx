'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, GripVertical, Save, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavigationManager() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    label: { id: '', en: '' },
    href: '',
    type: 'custom',
    slug: ''
  });

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    setIsLoading(true);
    try {
      const [resId, resEn] = await Promise.all([
        fetch('/api/navigation?locale=id'),
        fetch('/api/navigation?locale=en')
      ]);
      
      const dataId = await resId.json();
      const dataEn = await resEn.json();
      
      // Merge data to have both labels available
      const mergedItems = dataId.map((item: any, index: number) => ({
        ...item,
        label: {
          id: item.label,
          en: dataEn[index]?.label || item.label // Fallback to ID label if EN missing
        }
      }));
      
      setItems(mergedItems);
    } catch (error) {
      console.error('Failed to fetch navigation', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (index: number | null = null) => {
    setEditingIndex(index);
    if (index !== null) {
      const item = items[index];
      setFormData({
        label: { id: item.label.id, en: item.label.en },
        href: item.href,
        type: item.type || 'custom',
        slug: item.href.replace('/', '')
      });
    } else {
      setFormData({
        label: { id: '', en: '' },
        href: '',
        type: 'custom',
        slug: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Remove this item from navigation?')) return;
    
    try {
      await fetch('/api/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          index
        })
      });
      fetchNavigation();
    } catch (error) {
      alert('Failed to delete item');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate href from slug if custom
    const itemData = {
      ...formData,
      href: formData.type === 'custom' ? `/${formData.slug}` : formData.href
    };

    try {
      await fetch('/api/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editingIndex !== null ? 'update' : 'add',
          index: editingIndex,
          item: itemData
        })
      });
      setIsModalOpen(false);
      fetchNavigation();
    } catch (error) {
      alert('Failed to save item');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Navigation</h1>
          <p className="text-gray-500 mt-1">Manage the main menu structure. Adding a new item creates a page placeholder.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-faji-blue text-white rounded-lg hover:bg-faji-blue/90 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Menu Item
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold w-10">#</th>
                <th className="px-6 py-4 font-semibold">Label</th>
                <th className="px-6 py-4 font-semibold">Link / Path</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-400">
                    <GripVertical className="w-4 h-4 cursor-move" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div>{item.label.id}</div>
                    <div className="text-xs text-gray-500">{item.label.en}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-500 text-xs">
                    {item.href}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'system' 
                        ? 'bg-purple-50 text-purple-700' 
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {item.type === 'system' ? 'System' : 'Custom Page'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(index)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingIndex !== null ? 'Edit Menu Item' : 'Add New Page to Menu'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Title (Indonesian)</label>
                    <input
                      type="text"
                      required
                      value={formData.label.id}
                      onChange={(e) => setFormData({...formData, label: {...formData.label, id: e.target.value}})}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue text-sm"
                      placeholder="e.g. Layanan Kami"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Title (English)</label>
                    <input
                      type="text"
                      required
                      value={formData.label.en}
                      onChange={(e) => setFormData({...formData, label: {...formData.label, en: e.target.value}})}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue text-sm"
                      placeholder="e.g. Our Services"
                    />
                  </div>

                  {formData.type === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">/</span>
                        <input
                          type="text"
                          required
                          value={formData.slug}
                          onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue text-sm pl-6"
                          placeholder="page-slug"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">This will create a new page at this URL.</p>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-faji-blue text-white rounded-lg hover:bg-faji-blue/90 font-medium"
                    >
                      {editingIndex !== null ? 'Update Item' : 'Create Page & Add to Menu'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}