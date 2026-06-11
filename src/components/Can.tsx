import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useState } from 'react';

export default function Can() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  
  // Dynamic light reflection that moves in the opposite direction of rotation
  // This heavily sells the 3D cylindrical surface effect
  const specularX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "-100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates (-0.5 to 0.5)
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0); 
  };

  const repeatingText = "BREW & CAN   ";

  return (
    <div className="relative group perspective-1000 origin-center rotate-[6deg]">
      {/* Dynamic ambient backdrop shadow */}
      <div 
        className={`absolute -inset-10 bg-[#FF4D00]/20 blur-[60px] rounded-full scale-y-75 transition-opacity duration-700 ease-in-out z-0 ${isHovered ? 'opacity-80' : 'opacity-30'}`}
      />

      <motion.div 
        className="relative w-[220px] h-[480px] sm:w-[260px] sm:h-[540px] mx-auto z-10 cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
      >
        {/* Main Can Wrapper */}
        <div className="absolute inset-0 rounded-[28px] bg-[#111] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          
          {/* Top Aluminum Rim */}
          <div className="absolute top-0 inset-x-0 h-[18px] bg-gradient-to-b from-[#E0E0E0] via-[#999] to-[#444] z-40 border-b border-[#222]">
            {/* Rim inner detail */}
            <div className="absolute bottom-[2px] inset-x-[5%] h-[4px] bg-[#ccc] rounded-[50%] opacity-50 blur-[1px]"></div>
          </div>
          
          {/* Bottom Aluminum Rim */}
          <div className="absolute bottom-0 inset-x-0 h-[14px] bg-gradient-to-t from-[#333] via-[#888] to-[#222] z-40 border-t border-[#111]"></div>

          {/* ALL-OVER TEXTURE (Brew & Can repeat) */}
          {/* Using mix-blend-overlay creates a sophisticated UV gloss printed effect on the matte body */}
          <div className="absolute inset-0 z-0 flex flex-col justify-around py-8 opacity-[0.12] pointer-events-none select-none overflow-hidden mix-blend-overlay">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="whitespace-nowrap text-[#FFF] text-[36px] font-black uppercase tracking-tight leading-[0.85] rotate-[-8deg] scale-125 w-[200%] origin-center"
                style={{ marginLeft: i % 2 === 0 ? '-10%' : '-30%' }}
              >
                {repeatingText.repeat(10)}
              </div>
            ))}
          </div>

          {/* NOISE & GRAIN (Sells the matte physical texture) */}
          <div 
            className="absolute inset-0 z-10 opacity-[0.15] mix-blend-screen pointer-events-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />

          {/* CENTER BRANDING LABEL */}
          <div className="absolute inset-0 z-20 flex flex-col items-center p-4 pt-32 pointer-events-none">
            {/* Primary Orange Slash Label */}
            <div className="w-[120%] py-12 bg-[#FF4D00] flex flex-col items-center justify-center rotate-[-8deg] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-y-[4px] border-[#0A0A0A]">
              <h2 className="text-[#0A0A0A] text-[72px] sm:text-[84px] font-black leading-[0.8] tracking-[-4px] uppercase text-center scale-y-110">
                Brew<br/>& Can
              </h2>
            </div>
            
            <div className="mt-16 bg-[#0A0A0A] text-[#FF4D00] px-4 py-1.5 font-bold text-xs sm:text-[10px] uppercase tracking-[2px] border border-[#FF4D00] shadow-[0_0_15px_rgba(255,77,0,0.2)] whitespace-nowrap">
              Speciality Brewed In A Can
            </div>

            <div className="mt-auto mb-10 flex flex-col items-center opacity-60">
              <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.2em] text-[#FFF] uppercase">240ml e / 8.1 FL OZ</span>
              <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.15em] text-[#FF4D00] uppercase mt-1 text-center">Zero Sugar &bull; 100% Arabica<br/>Light / Medium / Dark Roast</span>
            </div>
          </div>

          {/* 3D LIGHTING ENGINE (Provides cylindrical depth) */}
          {/* Edge Shadows (Fixed) */}
          <div className="absolute inset-0 z-30 bg-gradient-to-r from-[rgba(0,0,0,0.95)] via-transparent to-[rgba(0,0,0,0.95)] pointer-events-none" />
          
          {/* Secondary ambient reflection (Fixed left) */}
          <div className="absolute inset-y-0 left-[8%] w-[12%] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent z-40 pointer-events-none mix-blend-overlay blur-[2px]" />
          
          {/* Primary Specular Highlight (Moves with mouse) */}
          <motion.div
            className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.25)] to-transparent z-40 pointer-events-none mix-blend-overlay blur-[4px]"
            style={{ x: specularX, left: "30%" }} // Centered base, shifts heavily based on mouse
          />
        </div>
      </motion.div>
    </div>
  );
}
