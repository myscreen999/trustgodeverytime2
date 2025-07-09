import { useState, useEffect } from 'react';

export const useContent = <T>(dataPath: string): T | null => {
  const [content, setContent] = useState<T | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(dataPath);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          // Fallback to default content if file doesn't exist
          console.warn(`Could not load ${dataPath}, using default content`);
        }
      } catch (error) {
        console.warn(`Error loading ${dataPath}:`, error);
      }
    };

    loadContent();
  }, [dataPath]);

  return content;
};