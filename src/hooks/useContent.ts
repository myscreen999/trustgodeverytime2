import { useState, useEffect } from 'react';

export const useContent = <T>(filename: string): T | null => {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Add cache busting timestamp
        const timestamp = Date.now();
        
        // Try multiple paths to ensure we find the data
        const paths = [
          `/data/${filename}?v=${timestamp}`,
          `/src/data/${filename}?v=${timestamp}`,
          `/${filename}?v=${timestamp}`
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
        
        if (data) {
          setContent(data);
        } else {
          console.warn(`Could not load ${filename}, using default content`);
        }
      } catch (error) {
        console.warn(`Error loading ${filename}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [filename]);

  return content;
};