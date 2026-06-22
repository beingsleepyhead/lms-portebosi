'use client';

import { useAuthStore } from '@/store/authStore';
import { Bell, Menu, LogOut, Settings, Users } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Header() {
  const { user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isRep = user?.role === 'representative';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">LP</span>
            </div>
            <span className="hidden sm:inline font-bold text-gray-900">LMS PorteBosi</span>
          </Link>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin Panel */}
            {isAdmin && (
              <Link
                href="/admin"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                title="Admin Panel"
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}

            {/* Rep Panel */}
            {isRep && (
              <Link
                href="/representative"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                title="Representative Panel"
              >
                <Users className="w-5 h-5" />
              </Link>
            )}

            {/* Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="px-4 py-3 space-y-2">
            <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-white rounded">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-white rounded flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
