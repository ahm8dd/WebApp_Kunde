import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Circle, Divide } from "lucide-react"; // Verwenden Sie Lucide-Icons für den Reifen

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  // Ladebalken-Logik
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  // Framer Motion Varianten für die Rotation
  const tireVariants = {
    // Endlose Rotation
    spin: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#0e131f] z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          className="mb-8 relative w-32 h-32 mx-auto"
          variants={tireVariants}
          animate="spin"
        >
          {/* SVG/Icon: Ein stilisierter Reifen aus Lucide Icons oder SVG */}
          <div className="absolute inset-0 flex items-center justify-center text-[#ff0035]">
             {/* Äußerer Ring (Reifen) */}
             <Circle className="w-full h-full stroke-2" style={{ strokeWidth: '3px' }}/> 
             {/* Felge/Speichen (verwenden Sie Divide oder eine andere Form) */}
             <Divide className="absolute w-2/3 h-2/3 rotate-45 stroke-2 text-[#ffffff]" style={{ strokeWidth: '3px' }}/>
             <Divide className="absolute w-2/3 h-2/3 -rotate-45 stroke-2 text-[#ffffff]" style={{ strokeWidth: '3px' }}/>
          </div>
          <Zap className="absolute w-8 h-8 top-1/2 left-1/2 -mt-4 -ml-4 text-[#ff0035] fill-[#ff0035]" /> {/* Optional: Kleiner Blitz in der Mitte */}
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-4">M&M Reifenservice</h2>
        
        {/* Ladebalken */}
        <div className="w-64 h-2 bg-[#38405f] rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-[#ff0035]" // Farbe des Ladebalkens
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}