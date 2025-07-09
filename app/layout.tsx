import './styles/globals.css';
import AppBar from '../components/AppBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IP Dashboard',
  description: 'Manage Intellectual Property with elegance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
        <div className="flex flex-col min-h-screen">
          <AppBar />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
