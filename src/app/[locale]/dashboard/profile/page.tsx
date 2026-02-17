'use client';

import { User, Mail, Shield, Key } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account information.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-faji-blue/10 text-faji-blue rounded-full flex items-center justify-center text-2xl font-bold">
              A
            </div>
            <div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Change Avatar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue pl-9 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  defaultValue="admin@faji.org"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue pl-9 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Shield className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  defaultValue="Super Admin"
                  disabled
                  className="w-full rounded-lg border-gray-300 bg-gray-50 text-gray-500 pl-9 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button className="px-4 py-2 bg-faji-blue text-white rounded-lg hover:bg-faji-blue/90 font-medium text-sm shadow-sm">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue pl-9 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-faji-blue focus:ring-faji-blue pl-9 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm shadow-sm">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}