import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Michelin', url: 'https://cdn.worldvectorlogo.com/logos/michelin.svg' },
  { name: 'Continental', url: 'https://cdn.worldvectorlogo.com/logos/continental-2.svg' },
  { name: 'Pirelli', url: 'https://cdn.worldvectorlogo.com/logos/pirelli.svg' },
  { name: 'Bridgestone', url: 'https://cdn.worldvectorlogo.com/logos/bridgestone.svg' },
  { name: 'Goodyear', url: 'https://cdn.worldvectorlogo.com/logos/goodyear-logo.svg' },
  { name: 'Hankook', url: 'https://cdn.worldvectorlogo.com/logos/hankook-1.svg' },
  { name: 'Dunlop', url: 'https://cdn.worldvectorlogo.com/logos/dunlop.svg' },
  { name: 'Falken', url: 'https://cdn.worldvectorlogo.com/logos/falken.svg' },
  { name: 'Bosch', url: 'https://cdn.worldvectorlogo.com/logos/bosch-2022.svg' },
  { name: 'ZF', url: 'https://cdn.worldvectorlogo.com/logos/zf.svg' },
  { name: 'Liqui Moly', url: 'https://cdn.worldvectorlogo.com/logos/liqui-moly.svg' },
  { name: 'Castrol', url: 'https://cdn.worldvectorlogo.com/logos/castrol-2.svg' },
  { name: 'Hella', url: 'https://cdn.worldvectorlogo.com/logos/hella.svg' },
  { name: 'Mahle', url: 'https://cdn.worldvectorlogo.com/logos/mahle.svg' },
  { name: 'A.T.U', url: 'https://cdn.worldvectorlogo.com/logos/a-t-u.svg' }, // Beispiel für eine Servicekette
];

export default function BrandPartners() {
  const extendedBrands = [...brands, ...brands];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="py-12 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-gray-500 mb-12">
          Wir setzen auf Qualität: Reifen und Teile von führenden Herstellern
        </h3>
        <div className="relative w-full overflow-hidden group">
          <style jsx>{`
            .marquee-container {
              display: flex;
              width: fit-content;
              animation: marquee 120s linear infinite;
            }
            .group:hover .marquee-container {
              animation-play-state: paused;
            }
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            
            /* Mobile optimization - show 3 logos at a time */
            @media (max-width: 768px) {
              .logo-item {
                width: calc(100vw / 3 - 2rem);
                min-width: calc(100vw / 3 - 2rem);
                margin: 0 1rem;
              }
            }
          `}</style>
          <div className="marquee-container">
            {extendedBrands.map((brand, index) => (
              <div 
                key={index} 
                className="logo-item flex-shrink-0 w-48 mx-8 lg:mx-12 flex items-center justify-center h-24"
              >
                <img
                  src={brand.url}
                  alt={`${brand.name} logo - Qualitätsprodukte für Ihr Fahrzeug`}
                  className="h-14 w-auto object-contain filter grayscale opacity-70 transition-all duration-300 ease-in-out hover:grayscale-0 hover:opacity-100 hover:scale-110"
                  style={{ 
                    imageRendering: 'crisp-edges',
                    maxHeight: '56px',
                    height: '56px'
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}