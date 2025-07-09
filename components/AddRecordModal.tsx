'use client';
import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddRecordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    title: '',
    author: '',
    type: '',
    year: '',
    status: '',
    client: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzIk2s89l8sK9n52QKPq9QqKj21_UPjneHWapvXE6g0xk3TGZvgFDGK-1O2xHCof7iGxg/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Record added successfully!');
        onClose();
      } else {
        alert('Failed to add record.');
      }
    } catch (err) {
      alert('Error submitting form.');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg p-6 space-y-4 relative">
        <h2 className="text-xl font-semibold mb-2">➕ Add New Record</h2>

        <input
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        <select
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option>Copyright</option>
          <option>Patent</option>
          <option>Trademark</option>
        </select>
        <input
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          name="client"
          placeholder="Client Type"
          value={formData.client}
          onChange={handleChange}
        />
        <textarea
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecordModal;
