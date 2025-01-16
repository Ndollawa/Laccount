import React, { useLayoutEffect, useCallback } from 'react';

const useImportStyle = (resourceUrls: string[], cssType = 'css') => {
  // Add styles before component mounts
  const addStyles = useCallback(() => {
    // Use a Set to track existing <link> tags and avoid duplicates
    const existingLinks = new Set(
      Array.from(document.head.getElementsByTagName('link')).map((link) => link.href)
    );

    resourceUrls.forEach((url) => {
      if (!existingLinks.has(url)) {
        const linkTag = document.createElement('link');
        linkTag.href = url;
        linkTag.rel = 'stylesheet';
        linkTag.media = 'all';
        linkTag.type = `text/${cssType}`;

        // Error handling for loading failures
        linkTag.onerror = () => {
          console.error(`Error occurred while loading stylesheet: ${url}`);
        };

        document.head.appendChild(linkTag);
      }
    });
  }, [resourceUrls, cssType]);
 // Add the styles when component mounts
    addStyles();
  // Cleanup styles on component unmount or resource URL changes
  useLayoutEffect(() => {
   

    // Cleanup function to remove the specific <link> tags
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
  }); //, [resourceUrls, addStyles] Ensure that useEffect runs when resourceUrls change
};

export default useImportStyle;
