import { useState, useEffect } from 'react';

export const useContent = <T>(dataPath: string): T | null => {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Clean path and add cache busting
        let cleanPath = dataPath.startsWith('/') ? dataPath.slice(1) : dataPath;
        const timestamp = Date.now();
        
        // Try multiple paths to ensure we find the data
        const paths = [
          `/${cleanPath}?v=${timestamp}`,
          `/src/data/${cleanPath.split('/').pop()}?v=${timestamp}`,
          `/${cleanPath.replace('src/data/', '')}?v=${timestamp}`
        ];
        
        let data = null;
        for (const path of paths) {
          try {
            const response = await fetch(path);
            if (response.ok) {
              data = await response.json();
              break;
            }
          } catch (err) {
            continue;
          }
        }
        
        if (response.ok) {
          setContent(data);
        } else {
          console.warn(`Could not load ${dataPath}, using default content`);
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