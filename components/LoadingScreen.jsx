import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// 1. SyncLoader importieren (angenommen, er ist installiert)
import { SyncLoader } from "react-spinners";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  // Ladebalken-Logik
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Verzögerung, bevor die Seite angezeigt wird, um den Ladeeffekt zu sehen
          setTimeout(() => onLoadingComplete(), 300);
          return 100;
        }
        // Lädt schneller hoch, um den Fortschritt klarer zu zeigen
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  // Framer Motion Varianten für die Rotation sind jetzt nicht mehr notwendig
  /* const tireVariants = { ... } */

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // Hintergrundfarbe aus deinem Original-Code: Dunkelblau
      className="fixed inset-0 bg-[#0e131f] z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* 2. Hier wird der SyncLoader eingefügt */}
        <div className="mb-10 mt-4">
          <SyncLoader
            color="#ff0035" // Akzentfarbe Rot
            cssOverride={{}}
            loading
            margin={2}
            size={20}
            speedMultiplier={1}
          />
        </div>

        {/* Titel */}

        {/* Ladebalken */}

        {/* Optionale Prozentanzeige */}
      </div>
    </motion.div>
  );
}
