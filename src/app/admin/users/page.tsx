'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/types';
import { CheckCircle, XCircle, Users, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
      return;
    }

    fetchUsers();
  }, [isAdmin, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isApproved: true }),
      });

      if (response.ok) {
        toast.success('User approved');
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to approve user:', error);
      toast.error('Failed to approve user');
    }
  };

  const handleReject = async (userId: string) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isApproved: false }),
      });

      if (response.ok) {
        toast.success('User rejected');
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to reject user:', error);
      toast.error('Failed to reject user');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const pending = users.filter(u => !u.isApproved);
  const approved = users.filter(u => u.isApproved);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">Approve or reject new member registrations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold">{pending.length}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Approved</p>
              <p className="text-3xl font-bold">{approved.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      {pending.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pending Approvals</h2>
          <div className="space-y-3">
            {pending.map(u => (
              <div key={u.id} className="bg-white p-6 rounded-lg border border-yellow-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{u.displayName}</h3>
                  <p className="text-sm text-gray-600">{u.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Requested: {new Date(u.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(u.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(u.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Users */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Approved Members ({approved.length})</h2>
        <div className="space-y-2">
          {approved.map(u => (
            <div key={u.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{u.displayName}</h3>
                <p className="text-sm text-gray-600">{u.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                u.role === 'admin' ? 'bg-red-100 text-red-800' :
                u.role === 'representative' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
