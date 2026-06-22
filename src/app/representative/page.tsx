'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, BarChart3 } from 'lucide-react';

export default function RepPanel() {
  const router = useRouter();
  const { user } = useAuthStore();

  const isRep = user?.role === 'representative';

  useEffect(() => {
    if (!isRep) {
      router.push('/dashboard');
    }
  }, [isRep, router]);

  if (!isRep) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Representative Panel</h1>
        <p className="text-gray-600 mt-2">Create and manage study cycles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Cycle */}
        <Link href="/representative/cycles/new" className="group">
          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Create Study Cycle</h3>
            <p className="text-gray-600 mt-2">Start a new study cycle for your group</p>
            <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">Create →</div>
          </div>
        </Link>

        {/* Manage Cycles */}
        <Link href="/representative/cycles" className="group">
          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Manage Cycles</h3>
            <p className="text-gray-600 mt-2">View and manage existing study cycles</p>
            <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">View →</div>
          </div>
        </Link>

        {/* Progress Analytics */}
        <Link href="/representative/analytics" className="group">
          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Progress Analytics</h3>
            <p className="text-gray-600 mt-2">Monitor group progress and submissions</p>
            <div className="mt-4 text-blue-600 group-hover:text-blue-700 font-medium">View →</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
