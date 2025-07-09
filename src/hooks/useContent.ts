import { useState, useEffect } from 'react';

export const useContent = <T>(dataPath: string): T | null => {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Remove leading slash and add proper path resolution
        const cleanPath = dataPath.startsWith('/') ? dataPath.slice(1) : dataPath;
        
        // Try to fetch from the data files
        const response = await fetch(`/${cleanPath}?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          console.warn(`Could not load ${cleanPath}, using default content`);
          // Try to load from public folder as fallback
          const fallbackResponse = await fetch(`/public/${cleanPath}?t=${Date.now()}`);
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setContent(fallbackData);
          }
        }
      } catch (error) {
        console.warn(`Error loading ${dataPath}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [dataPath]);

  return content;
};