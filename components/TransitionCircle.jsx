import React from "react";
import { motion } from "framer-motion";

// Farbpalette
const PRIMARY_TEXT_COLOR = "#38405f";
const ACCENT_COLOR = "#ff0035"; // Rot
const LIGHT_BG_COLOR = "#E8F4F8"; // Beibehaltung eines sehr hellen Hintergrunds für den äußeren Ring
const DARK_BG_COLOR = "#38405f"; // Dunkler Akzent für den äußeren Ring

const RotatingText = () => (
  <motion.div
    className="absolute inset-0 w-full h-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path
        id="textPath"
        d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
        fill="transparent"
      />
      <text 
        fill={PRIMARY_TEXT_COLOR} // Dunkler Text
        className="uppercase"
        style={{ 
          fontSize: '7px',
          fontFamily: 'sans-serif',
          fontWeight: 'normal'
        }}
      >
        <textPath xlinkHref="#textPath" textLength="264" lengthAdjust="spacingAndGlyphs">
          * PREISWERT * ZUVERLÄSSIG * KOMPETENT *
        </textPath>
      </text>
    </svg>
  </motion.div>
);

export default function TransitionCircle() {
  return (
    <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-30">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px]"
      >
        {/* Outer Accent Circle - Farbe aus Palette: #38405f */}
        <div 
          className={`absolute inset-0 rounded-full shadow-xl p-3 md:p-4 lg:p-5`}
          style={{ backgroundColor: DARK_BG_COLOR }}
        >
          {/* Inner White Circle */}
          <div 
            className="w-full h-full rounded-full flex flex-col items-center justify-center bg-white text-center border-2 border-dashed"
            style={{ borderColor: ACCENT_COLOR }} // Roter Rahmen
          >
            {/* M&M Reifenservice Text */}
            <div className="px-2 py-1 w-full h-full flex flex-col items-center justify-center">
              <h3 
                className={`font-sans font-extrabold text-[#333333] leading-tight mb-1`}
                style={{ 
                  fontSize: 'clamp(18px, 4vw, 20px)',
                  letterSpacing: '1px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.15)'
                }}
              >
                M&M
              </h3>
              <p 
                className={`font-sans font-bold tracking-wider`}
                style={{ 
                  fontSize: 'clamp(11px, 2.5vw, 13px)',
                  letterSpacing: '1px',
                  color: ACCENT_COLOR // Roter Akzent für Subtitel
                }}
              >
                Reifenservice
              </p>
            </div>
          </div>
        </div>

        {/* Rotating Text */}
        <RotatingText />
        
      </motion.div>
    </div>
  );
}