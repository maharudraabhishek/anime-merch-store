import React, { createContext, useEffect, useState, useCallback } from 'react';

/**
 * ThemeContext provides light/dark theme values to the rest of the app.
 *
 * The logic here follows the TailwindCSS recommendations for
 * three‑way theme toggles (light, dark and system)【624978474302290†L340-L361】.  When
 * the user toggles the theme, we persist the choice in localStorage
 * and update the `html` class accordingly.  If no preference is saved
 * the system preference (prefers‑color‑scheme) is respected.
 */
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply the theme class to the html element on mount and when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};