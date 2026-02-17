'use client';

import { Globe, Bell, Moon, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage application preferences and configurations.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">General Preferences</h2>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="p-6 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg h-fit">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Default Language</h3>
                <p className="text-sm text-gray-500">Set the default language for the dashboard.</p>
              </div>
            </div>
            <select className="rounded-lg border-gray-300 text-sm focus:border-faji-blue focus:ring-faji-blue">
              <option>English</option>
              <option>Indonesian</option>
            </select>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg h-fit">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Appearance</h3>
                <p className="text-sm text-gray-500">Customize how the dashboard looks.</p>
              </div>
            </div>
            <select className="rounded-lg border-gray-300 text-sm focus:border-faji-blue focus:ring-faji-blue">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="p-6 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg h-fit">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive emails about new updates and activity.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-faji-blue"></div>
            </label>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg h-fit">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive push notifications on your device.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-faji-blue"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}