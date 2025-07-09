'use client';
import { useEffect, useState, createContext, useContext } from 'react';

const ThemeContext = createContext({ toggle: () => {}, theme: 'light' });

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light';
    setTheme(stored);
    document.documentElement.classList.toggle('dark', stored === 'dark');
  }, []);

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ toggle, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
