'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { StudyCycle } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [cycles, setCycles] = useState<StudyCycle[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeCycle } = useAppStore();

  useEffect(() => {
    // Fetch cycles
    const fetchCycles = async () => {
      try {
        const response = await fetch('/api/cycles');
        const data = await response.json();
        setCycles(data);
      } catch (error) {
        console.error('Failed to fetch cycles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCycles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const active = cycles.find(c => c.status === 'active' || c.status === 'submission_open');
  const completed = cycles.filter(c => c.status === 'completed');
  const pending = cycles.filter(c => c.status === 'planning');

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Cycles</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{cycles.filter(c => c.status === 'active' || c.status === 'submission_open').length}</p>
            </div>
            <Clock className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{completed.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{pending.length}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{Math.round((completed.length / (cycles.length || 1)) * 100)}%</p>
            </div>
            <BookOpen className="w-10 h-10 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Active Cycle */}
      {active && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white shadow-lg">
          <div className="max-w-2xl">
            <p className="text-blue-100 text-sm font-semibold uppercase">Current Study</p>
            <h2 className="text-3xl font-bold mt-2">{active.subject}</h2>
            <p className="text-blue-100 mt-1">{active.chapter}</p>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Topics</p>
                <p className="text-2xl font-bold">{active.topics.length}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Status</p>
                <p className="text-lg font-semibold capitalize">{active.status.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Deadline</p>
                <p className="text-lg font-semibold">{new Date(active.deadline).toLocaleDateString()}</p>
              </div>
            </div>

            <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Cycles List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Study Cycles</h3>
        <div className="grid gap-4">
          {cycles.length === 0 ? (
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No study cycles yet. Your group representative will create the first one.</p>
            </div>
          ) : (
            cycles.map(cycle => (
              <div key={cycle.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{cycle.subject}</h4>
                    <p className="text-gray-600">{cycle.chapter}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cycle.topics.slice(0, 3).map(topic => (
                        <span key={topic.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {topic.name}
                        </span>
                      ))}
                      {cycle.topics.length > 3 && (
                        <span className="text-gray-600 text-sm">+{cycle.topics.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      cycle.status === 'completed' ? 'bg-green-100 text-green-800' :
                      cycle.status === 'submission_open' ? 'bg-yellow-100 text-yellow-800' :
                      cycle.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {cycle.status.replace('_', ' ')}
                    </span>
                    <p className="text-sm text-gray-600 mt-2">Due: {new Date(cycle.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
