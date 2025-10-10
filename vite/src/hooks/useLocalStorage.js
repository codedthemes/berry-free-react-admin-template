import { useState, useEffect, useCallback } from 'react';

// ==============================|| HOOKS - LOCAL STORAGE ||============================== //

export function useLocalStorage(key, defaultValue) {
  // Load initial state from localStorage or fallback to default
  const readValue = () => {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.warn(`Error reading localStorage key “${key}”:`, err);
      return defaultValue;
    }
  };

  const [state, setState] = useState(readValue);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.warn(`Error setting localStorage key “${key}”:`, err);
    }
  }, [key, state]);

  // Update single field
  const setField = useCallback((key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Reset to defaults
  const resetState = useCallback(() => {
    setState(defaultValue);
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }, [defaultValue, key]);

  return { state, setState, setField, resetState };
}
