import React, { useEffect } from 'react';

const useImportStyle = (resourceUrls: string[], cssType = "css") => {
  useEffect(() => {
    const existingLinks = new Set<string>(
      Array.from(document.head.getElementsByTagName('link')).map((link) => link.href)
    );

    resourceUrls.forEach((url) => {
      if (!existingLinks.has(url)) {
        const styleTag = document.createElement('link');
        styleTag.href = url;
        styleTag.rel = "stylesheet";
        styleTag.media = "all";
        styleTag.type = `text/${cssType}`;

        styleTag.onerror = () => {
          console.error('Error occurred while loading styles');
        };

        document.head.appendChild(styleTag);
      }
    });
    
    // No cleanup to retain the styles across navigations.
  }, [resourceUrls, cssType]); // Only runs when URLs or type change
};

export default useImportStyle;
