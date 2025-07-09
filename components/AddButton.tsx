'use client';
export default function AddButton() {
  return (
    <button
      onClick={() => alert('Open Add New Record Modal')}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg"
    >
      ➕ Add New
    </button>
  );
}
