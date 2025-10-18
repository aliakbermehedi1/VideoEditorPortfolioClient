// src/components/TawkToChat.jsx
import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    // Your actual Tawk.to IDs
    const TAWK_PROPERTY_ID = "68f36676ed62ca194b9318ec";
    const TAWK_WIDGET_ID = "1j7rcgg4f";

    // Create Tawk.to script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Optional: Customize widget behavior
    script.onload = () => {
      window.Tawk_API = window.Tawk_API || {};
      
      // Custom visitor info
      window.Tawk_API.onLoad = function(){
        console.log('Tawk.to chat loaded successfully! ✅');
      };
    };

    // Cleanup
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default TawkToChat;