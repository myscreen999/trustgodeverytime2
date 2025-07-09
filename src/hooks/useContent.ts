import { useState, useEffect } from 'react';

export const useContent = <T>(dataPath: string): T | null => {
  const [content, setContent] = useState<T | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Remove leading slash and add proper path resolution
        const cleanPath = dataPath.startsWith('/') ? dataPath.slice(1) : dataPath;
        const response = await fetch(`/${cleanPath}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          console.warn(`Could not load ${cleanPath}, using default content`);
        }
      } catch (error) {
        console.warn(`Error loading ${dataPath}:`, error);
      }
    };

    loadContent();
  }, [dataPath]);

  return content;
};