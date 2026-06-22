'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import Link from 'next/link';
import { Users, BarChart3, Settings } from 'lucide-react';

export default function AdminPanel() {
  const router = useRouter();
  const { user } = useAuthStore();

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-2">Platform administration and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management */}
        <Link href="/admin/users" className="group">
          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">User Management</h3>
            <p className="text-gray-600 mt-2">Approve new members and manage roles</p>
            <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">View →</div>
          </div>
        </Link>

        {/* Analytics */}
        <Link href="/admin/analytics" className="group">
          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Analytics</h3>
            <p className="text-gray-600 mt-2">View study progress and group statistics</p>
            <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">View →</div>
          </div>
        </Link>

        {/* Settings */}
        <Link href="/admin/settings" className="group">
          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
            <p className="text-gray-600 mt-2">System configuration and preferences</p>
            <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">View →</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
