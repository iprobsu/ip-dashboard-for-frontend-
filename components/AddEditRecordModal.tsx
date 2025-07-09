'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  isOpen: boolean;
  initialData?: Record<string, any>;
  onClose: () => void;
  onSave: (newData: any, isEdit: boolean) => void;
}

export default function AddEditRecordModal({ isOpen, initialData, onClose, onSave }: Props) {
  const [fields, setFields] = useState<string[]>([]);
  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    axios.get('http://localhost:3001/api/search').then(res => {
      const sample = res.data.results[0] || {};
      setFields(Object.keys(sample));
      setForm(initialData || sample);
    });
  }, [initialData]);

  if (!isOpen) return null;
  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">{isEdit ? 'Edit' : 'Add New'} Record</h2>
        {fields.map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium capitalize">{f.replace(/_/g,' ')}</label>
            <input
              type="text"
              value={form[f] ?? ''}
              onChange={e => setForm(prev => ({ ...prev, [f]: e.target.value }))}
              className="mt-1 w-full border rounded px-2 py-1 bg-gray-100 dark:bg-gray-700"
            />
          </div>
        ))}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2">Cancel</button>
          <button
            onClick={() => onSave(form, isEdit)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
