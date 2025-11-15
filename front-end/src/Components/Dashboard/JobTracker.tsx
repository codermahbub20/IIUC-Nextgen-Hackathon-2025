'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X, Edit2, Trash2, Save, AlertCircle } from 'lucide-react';

type Status = 'Applied' | 'In Review' | 'Interview Scheduled' | 'Offer Received' | 'Rejected' | 'Accepted' | 'Withdrawn';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: Status;
  appliedDate: string;
  interviewDate?: string;
  notes?: string;
}

// Define the Form data structure
interface FormData {
    jobTitle: string;
    company: string;
    status: Status;
    appliedDate: string;
    interviewDate: string;
    notes: string;
}

// Separate FormContent into its own stable function component outside of the main component
// This improves stability and avoids potential re-rendering issues caused by its definition being inside JobTracker's render function.
const FormContent = ({ 
    onSubmit, 
    title, 
    onCancel, 
    formData, 
    setFormData 
}: { 
    onSubmit: (e: React.FormEvent) => void; 
    title: string; 
    onCancel: () => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) => (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Senior Frontend Developer"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Google Inc."
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {['Applied', 'In Review', 'Interview Scheduled', 'Offer Received', 'Rejected', 'Accepted', 'Withdrawn'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date</label>
          <div className="relative">
            <input
              type="date"
              value={formData.appliedDate}
              onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <CalendarIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date</label>
          <div className="relative">
            <input
              type="date"
              value={formData.interviewDate}
              onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <CalendarIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-32 resize-none outline-none"
          placeholder="Add notes about the application..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <X className="w-5 h-5" /> Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Save className="w-5 h-5" /> {title === 'Add' ? 'Save Application' : 'Update Application'}
        </button>
      </div>
    </form>
);

export default function JobTracker() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    company: '',
    status: 'Applied',
    appliedDate: format(new Date(), 'yyyy-MM-dd'),
    interviewDate: '',
    notes: ''
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  // Stats
  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'Applied').length,
    inReview: applications.filter(a => a.status === 'In Review').length,
    interviews: applications.filter(a => a.status === 'Interview Scheduled').length,
    offers: applications.filter(a => a.status === 'Offer Received').length
  };

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      company: '',
      status: 'Applied',
      appliedDate: format(new Date(), 'yyyy-MM-dd'),
      interviewDate: '',
      notes: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobTitle.trim() || !formData.company.trim()) return;

    const newApp: Application = {
      id: Date.now().toString(),
      ...formData
    };

    setApplications([...applications, newApp]);
    setShowAddForm(false);
    resetForm();
  };

  const handleEdit = (app: Application) => {
    setEditingApp(app);
    setFormData({
      jobTitle: app.jobTitle,
      company: app.company,
      status: app.status,
      appliedDate: app.appliedDate,
      interviewDate: app.interviewDate || '',
      notes: app.notes || ''
    });
    setShowEditForm(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp || !formData.jobTitle.trim() || !formData.company.trim()) return;

    const updated = { ...editingApp, ...formData };
    setApplications(applications.map(a => a.id === editingApp.id ? updated : a));
    setShowEditForm(false);
    setEditingApp(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!showDeleteConfirm) return;
    setApplications(applications.filter(a => a.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
  };

  const getStatusColor = (status: Status) => {
    const colors = {
      'Applied': 'text-blue-600 bg-blue-50',
      'In Review': 'text-yellow-600 bg-yellow-50',
      'Interview Scheduled': 'text-purple-600 bg-purple-50',
      'Offer Received': 'text-green-600 bg-green-50',
      'Rejected': 'text-red-600 bg-red-50',
      'Accepted': 'text-emerald-600 bg-emerald-50',
      'Withdrawn': 'text-gray-600 bg-gray-50'
    };
    return colors[status];
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
                </svg>
                Job Applications Tracker
              </h1>
              <p className="text-gray-600 mt-1">Track and manage your job applications</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Application
            </button>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total', value: stats.total, icon: 'document-check', color: 'text-blue-600' },
              { label: 'Applied', value: stats.applied, icon: 'mail', color: 'text-yellow-600' },
              { label: 'In Review', value: stats.inReview, icon: 'clock', color: 'text-orange-600' },
              { label: 'Interviews', value: stats.interviews, icon: 'calendar', color: 'text-purple-600' },
              { label: 'Offers', value: stats.offers, icon: 'gift', color: 'text-green-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                  <div className={`w-8 h-8 ${stat.color}`}>
                    {stat.icon === 'document-check' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4" />
                        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
                      </svg>
                    )}
                    {stat.icon === 'mail' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    )}
                    {stat.icon === 'clock' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                    {stat.icon === 'calendar' && (
                      <CalendarIcon className="w-8 h-8" />
                    )}
                    {stat.icon === 'gift' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="8" width="18" height="14" rx="2" />
                        <path d="M12 8v14" />
                        <path d="M8 12h8" />
                        <path d="M8 8h4a2 2 0 1 1-4 0z" />
                        <path d="M16 8h-4a2 2 0 1 0 4 0z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Applications List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Applications</h2>
            {applications.length === 0 ? (
              <div className="text-center py-16">
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddForm(true);
                  }}
                  className="inline-block"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
                    </svg>
                  </div>
                </button>
                <p className="text-gray-500">No applications yet. Click the icon above to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map(app => (
                  <div key={app.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{app.jobTitle}</h3>
                        <p className="text-gray-600">{app.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-500">Applied: {format(new Date(app.appliedDate), 'dd MMM yyyy')}</span>
                          {app.interviewDate && (
                            <span className="text-gray-500">Interview: {format(new Date(app.interviewDate), 'dd MMM yyyy')}</span>
                          )}
                        </div>
                        {app.notes && (
                          <p className="mt-3 text-sm text-gray-600 italic">"{app.notes}"</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                        <button
                          onClick={() => handleEdit(app)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(app.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Add New Application</h2>
              </div>
              <FormContent
                onSubmit={handleSubmit}
                title="Add"
                onCancel={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                formData={formData} // Explicitly pass state
                setFormData={setFormData} // Explicitly pass setter
              />
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditForm && editingApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Edit Application</h2>
              </div>
              <FormContent
                onSubmit={handleUpdate}
                title="Edit"
                onCancel={() => {
                  setShowEditForm(false);
                  setEditingApp(null);
                  resetForm();
                }}
                formData={formData} // Explicitly pass state
                setFormData={setFormData} // Explicitly pass setter
              />
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Delete Application?</h3>
              </div>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. This will permanently delete the application.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}