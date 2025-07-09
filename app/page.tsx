'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaCog, FaSearch } from 'react-icons/fa';
import AddRecordModal from '../components/AddRecordModal';

type Record = { [key: string]: string | number };

export default function Home() {
  const [records, setRecords] = useState<Record[]>([]);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showMore, setShowMore] = useState(false);
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/search').then(res => {
      setRecords(res.data.results.map((r: any) => ({
        ...r,
        type: r['ip type'] || '',
        status: r.status || 'Pending',
      })));
    });
  }, []);

  const filtered = records.filter(r => {
    const q = query.toLowerCase();
    return (
      (r.title?.toString().toLowerCase().includes(q) ||
        r.author?.toString().toLowerCase().includes(q)) &&
      (typeFilter === 'All' || r.type === typeFilter) &&
      (!yearFilter || String(r.year) === yearFilter) &&
      (!statusFilter || r.status === statusFilter)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center py-10 px-4 font-sans relative">

      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="IP Logo" className="w-12 h-12 animate-glow-bounce" />
          <h1 className="text-3xl font-bold tracking-tight">IP Dashboard</h1>
        </div>
      </div>

      {/* Searchbar */}
      <div className="relative w-full max-w-2xl mb-6">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search title, author..."
          className="w-full pl-12 pr-4 py-3 rounded-full shadow-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 w-full max-w-4xl">
        {['All', 'Copyright', 'Patent', 'Trademark'].map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              typeFilter === t ? 'bg-blue-600 text-white' : 'bg-white shadow'
            }`}
          >
            {t}
          </button>
        ))}

        <button
          onClick={() => setShowMore(m => !m)}
          className="px-4 py-2 rounded-full bg-gray-200 text-sm"
        >
          {showMore ? 'Hide' : 'More'}
        </button>

        <button
          onClick={() => setShowAdmin(a => !a)}
          className="px-4 py-2 rounded-full bg-gray-300 text-sm flex items-center gap-2"
          title="Toggle Admin Tools"
        >
          <FaCog /> Admin Tools
        </button>
      </div>

      {/* More filters */}
      {showMore && (
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {Array.from(new Set(records.map(r => r.year)))
            .sort()
            .map(y => (
              <button
                key={y}
                onClick={() => setYearFilter(String(y))}
                className={`px-3 py-1 rounded-full text-sm ${
                  yearFilter === String(y) ? 'bg-green-600 text-white' : 'bg-white shadow'
                }`}
              >
                {y}
              </button>
            ))}
          {['Approved', 'Pending', 'Expired'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-sm ${
                statusFilter === s ? 'bg-purple-600 text-white' : 'bg-white shadow'
              }`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => {
              setYearFilter(null);
              setStatusFilter(null);
            }}
            className="px-3 py-1 rounded-full text-sm bg-red-500 text-white"
          >
            Clear
          </button>
        </div>
      )}

      {/* Export */}
      <button
        onClick={() => {
          const keys = Object.keys(records[0] || {});
          const csv = [
            keys.join(','),
            ...filtered.map(r => keys.map(k => `"${r[k] || ''}"`).join(',')),
          ].join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'ip_records.csv';
          link.click();
        }}
        className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
      >
        Export CSV
      </button>

      {/* Floating Add Button */}
      {showAdmin && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl"
          title="Add Record"
        >
          <FaPlus />
        </button>
      )}

      {/* Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200"
          >
            <div className="space-y-1">
              {Object.entries(r).map(([k, v]) => (
                <p key={k} className="text-sm leading-snug">
                  <span className="font-semibold capitalize">{k.replace(/_/g, ' ')}:</span>{' '}
                  <span className="text-gray-700">{v}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <AddRecordModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
}
