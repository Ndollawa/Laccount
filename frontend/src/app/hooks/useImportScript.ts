import React, { useLayoutEffect } from 'react';

const useImportScript = (resourceUrls: string[], jsType = "javascript") => {
  useLayoutEffect(() => {
    const existingScripts = new Set<string>(
      Array.from(document.body.getElementsByTagName('script')).map((script) => script.src)
    );

    const scriptElements: HTMLScriptElement[] = [];

    resourceUrls.forEach((url) => {
      if (!existingScripts.has(url)) {
        const script = document.createElement('script');
        script.src = url;
        script.type = `text/${jsType}`;
        script.defer = true;

        script.onload = () => {
          console.log(`Script '${url}' has loaded successfully.`);
        };

        script.onerror = () => {
          console.error(`Error occurred while loading script '${url}'.`);
        };

        document.body.appendChild(script);
        scriptElements.push(script);
      }
    });

    // Cleanup function to remove only the scripts that were added by this hook
    return () => {
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [resourceUrls, jsType]); // Only re-run if URLs or type changes
};

export default useImportScript;
