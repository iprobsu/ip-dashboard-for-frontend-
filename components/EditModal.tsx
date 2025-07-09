'use client';
import React, { useState } from 'react';

export default function EditModal({ record, onClose, onSave }: any) {
  const [formData, setFormData] = useState({ ...record });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">✏️ Edit Record</h2>

        <div className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-2 border rounded"
          />
          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
            className="w-full p-2 border rounded"
          />
          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            className="w-full p-2 border rounded"
          />
          <input
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}