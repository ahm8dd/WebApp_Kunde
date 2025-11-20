import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  // Holt das aktuelle Location-Objekt, das sich bei jeder Navigation ändert
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrollt das Fenster bei jeder Änderung des 'pathname' (der URL) 
    // an die oberste linke Ecke (0, 0)
    window.scrollTo(0, 0);
    
  }, [pathname]); // Dieser Hook wird bei jeder Änderung von 'pathname' ausgelöst

  // Die Komponente rendert nichts
  return null; 
}