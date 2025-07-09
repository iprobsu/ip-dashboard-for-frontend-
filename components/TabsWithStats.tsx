'use client';
import React, { useState } from 'react';

export default function TabsWithStats({ records }: { records: any[] }) {
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredRecords =
    typeFilter === 'All'
      ? records
      : records.filter((r) => r.type === typeFilter);

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {['All', 'Copyright', 'Patent', 'Trademark'].map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition-all
              ${typeFilter === type
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{filteredRecords.length}</span>{' '}
        result{filteredRecords.length !== 1 ? 's' : ''} for{' '}
        <span className="font-semibold">{typeFilter}</span>
      </div>

      {/* Records List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecords.map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 shadow-md p-6 transition hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {r.title}
            </h2>
            <p className="text-sm text-gray-700">{r.author}</p>
            <div className="text-xs text-gray-500 mt-2">
              {r.type} • {r.year}
            </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No records found.
          </div>
        )}
      </div>
    </div>
  );
}
