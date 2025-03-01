// 1. Create a new file: src/scripts/theme-handler.js
// This will handle theme consistency across all pages

export function initTheme() {
    // This function runs immediately when imported
    const savedTheme = localStorage.getItem('theme');
    
    // Set theme based on storage or system preference
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  // Export a function to toggle theme that can be called from components
  export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  // Listen for storage events to sync theme across tabs
  export function setupThemeListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'theme') {
        document.documentElement.setAttribute('data-theme', event.newValue);
        if (event.newValue === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }