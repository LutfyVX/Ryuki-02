// src/components/ThemeToggle.jsx or .tsx
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');
  
  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };
  
  useEffect(() => {
    // Skip initial setup until we've loaded the saved theme
    if (theme === 'system' && !localStorage.getItem('theme')) return;
    
    // Set data-theme attribute on the document element
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);
  
  return (
    <button 
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' && (
        <span>🌞 Light</span>
      )}
      {theme === 'dark' && (
        <span>🌙 Dark</span>
      )}
      {theme === 'system' && (
        <span>⚙️ System</span>
      )}
    </button>
  );
}