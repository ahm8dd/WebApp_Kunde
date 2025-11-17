import React, { useState, useEffect } from "react"; // <--- HIER FEHLTEN useState und useEffect
import { motion } from "framer-motion";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

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

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0e131f] z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          className="mb-8"
        >
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e646aa23203e440181174d/01d013296_Artboard-7.jpg" 
            alt="M&M Reifenservice" 
            className="h-32 w-auto mx-auto brightness-110"
          />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-4">M&M Reifenservice</h2>
        
        <div className="w-64 h-2 bg-[#38405f] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#ff0035]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}