import React, { useLayoutEffect, useCallback } from 'react';

const useImportStyle = (resourceUrls: string[], cssType = 'css') => {
  // Add styles immediately before component mount
  const addStyles =  useCallback(()=>{ const existingLinks = new Set(
    Array.from(document.head.getElementsByTagName('link')).map((link) => link.href)
  );

  resourceUrls.forEach((url) => {
    if (!existingLinks.has(url)) {
      const styleTag = document.createElement('link');
      styleTag.href = url;
      styleTag.rel = 'stylesheet';
      styleTag.media = 'all';
      styleTag.type = `text/${cssType}`;

      styleTag.onerror = () => {
        console.error('Error occurred while loading styles');
      };

      document.head.appendChild(styleTag);
      existingLinks.add(url); // Avoid future duplicates
    }
  });
},[resourceUrls])


  // Cleanup styles on component unmount
  useLayoutEffect(() => {
    addStyles()
    return () => {
      resourceUrls.forEach((url) => {
        const linkToRemove = Array.from(document.head.getElementsByTagName('link')).find(
          (link) => link.href === url
        );
        if (linkToRemove) {
          document.head.removeChild(linkToRemove);
        }
      });
    };
  }, [resourceUrls]); // Cleanup on unmount or if URLs change
};

export default useImportStyle;
