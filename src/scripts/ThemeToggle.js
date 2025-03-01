// src/scripts/themeToggle.js

/**
 * Theme toggle functionality for Astro.js
 * This module manages light/dark/system theme preferences
 */
export function initThemeToggle() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupThemeToggle);
    } else {
      setupThemeToggle();
    }
  }
  
  function setupThemeToggle() {
    // Theme variables
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeDropdown = document.getElementById('theme-dropdown');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    const systemIcon = document.getElementById('system-icon');
    const themeLight = document.getElementById('theme-light');
    const themeDark = document.getElementById('theme-dark');
    const themeSystem = document.getElementById('theme-system');
    
    // Exit if elements aren't found (prevents errors in pages without theme toggle)
    if (!themeToggleBtn || !themeDropdown) return;
    
    // System theme detection
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Update the active icon based on current theme
    function updateThemeIcon(theme) {
      lightIcon.classList.add('hidden');
      darkIcon.classList.add('hidden');
      systemIcon.classList.add('hidden');
      
      if (theme === 'light') {
        lightIcon.classList.remove('hidden');
      } else if (theme === 'dark') {
        darkIcon.classList.remove('hidden');
      } else {
        systemIcon.classList.remove('hidden');
      }
    }
    
    // Get the current theme preference
    function getCurrentTheme() {
      return localStorage.getItem('theme-preference') || 'system';
    }
    
    // Apply the current theme immediately on load
    updateThemeIcon(getCurrentTheme());
    
    // Toggle dropdown visibility when clicking the button
    themeToggleBtn.addEventListener('click', () => {
      themeDropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!themeToggleBtn.contains(e.target) && !themeDropdown.contains(e.target)) {
        themeDropdown.classList.add('hidden');
      }
    });
    
    // Apply system preference
    function applySystemTheme() {
      if (systemPrefersDark.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Theme selection handlers
    themeLight.addEventListener('click', () => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme-preference', 'light');
      updateThemeIcon('light');
      themeDropdown.classList.add('hidden');
    });
    
    themeDark.addEventListener('click', () => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme-preference', 'dark');
      updateThemeIcon('dark');
      themeDropdown.classList.add('hidden');
    });
    
    themeSystem.addEventListener('click', () => {
      localStorage.setItem('theme-preference', 'system');
      applySystemTheme();
      updateThemeIcon('system');
      themeDropdown.classList.add('hidden');
    });
    
    // Listen for system preference changes
    systemPrefersDark.addEventListener('change', () => {
      if (getCurrentTheme() === 'system') {
        applySystemTheme();
      }
    });
  
    // Initial theme application based on stored preference
    const currentTheme = getCurrentTheme();
    if (currentTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      applySystemTheme();
    }
  }