import { motion } from 'motion/react';
import Can from './Can';

export default function Hero({ onSubscribeClick }: { onSubscribeClick: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] pt-32 pb-32 sm:pt-40 sm:pb-40 text-[#F0F0F0] min-h-[90vh] flex items-center">
      <div className="max-w-[1024px] mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center mt-8 md:mt-0">
          
          {/* Left Text */}
          <div className="flex flex-col items-start space-y-6 text-left border-l-[4px] border-[#FF4D00] pl-5 md:pl-6 ml-0 md:ml-[-24px] z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[64px] sm:text-[80px] md:text-[64px] lg:text-[100px] font-black uppercase tracking-[-2px] sm:tracking-[-4px] leading-[0.85] text-[#F0F0F0] break-words hyphens-auto"
            >
              SPECIALITY<br />
              BREW<br />
              READY.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] text-[#888] max-w-[340px] leading-[1.4]"
            >
              The convenience of specialty coffee without the hassle of brewing. Canned within 24 hours of roasting. Pure energy, no filler. Delivering across Delhi NCR.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-2 sm:pt-4 flex flex-col gap-4 w-full sm:w-auto"
            >
              <div>
                <div className="bg-[#FF4D00] text-black px-4 sm:px-5 py-2 sm:py-3 font-[800] text-[12px] sm:text-[14px] uppercase inline-block">
                  Canned Batch #0822
                </div>
              </div>
              <button 
                onClick={onSubscribeClick} 
                className="mt-2 bg-transparent border-2 border-[#F0F0F0] text-[#F0F0F0] px-6 sm:px-8 py-3 sm:py-4 font-bold uppercase tracking-wider text-[14px] hover:bg-[#F0F0F0] hover:text-black transition-colors w-full sm:min-w-[240px] md:w-max text-center"
              >
                Join the Club
              </button>
            </motion.div>
          </div>

          {/* Right CAN component */}
          <div className="flex justify-center relative mt-16 sm:mt-8 md:mt-0 md:justify-end">
            <div className="absolute top-[20px] md:top-[60px] md:right-[-20px] lg:right-[-40px] rotate-[10deg] border border-[#FF4D00] px-4 py-2 rounded-full text-[#FF4D00] text-xs font-bold uppercase z-20 bg-[#0A0A0A] shadow-md">
              BREWED &lt; 24H AGO
            </div>
            <Can />
          </div>
        </div>
      </div>
      
      {/* Marquee Banner */}
      <div className="absolute bottom-0 inset-x-0 h-10 sm:h-12 border-t border-[#222] bg-[#0A0A0A] overflow-hidden flex items-center z-20">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap text-[#FF4D00] font-bold uppercase tracking-[2px] text-[10px] sm:text-xs"
        >
          <div className="flex items-center gap-8 px-4">
            <span>Freshly Brewed</span>
            <span className="text-[#333]">•</span>
            <span>Zero Sugar</span>
            <span className="text-[#333]">•</span>
            <span>Indian Specialty</span>
            <span className="text-[#333]">•</span>
            <span>100% Arabica</span>
            <span className="text-[#333]">•</span>
            <span>Premium Cold Brew</span>
            <span className="text-[#333]">•</span>
            <span>No Artificial bs</span>
            <span className="text-[#333]">•</span>
          </div>
          <div className="flex items-center gap-8 px-4">
            <span>Freshly Brewed</span>
            <span className="text-[#333]">•</span>
            <span>Zero Sugar</span>
            <span className="text-[#333]">•</span>
            <span>Indian Specialty</span>
            <span className="text-[#333]">•</span>
            <span>100% Arabica</span>
            <span className="text-[#333]">•</span>
            <span>Premium Cold Brew</span>
            <span className="text-[#333]">•</span>
            <span>No Artificial bs</span>
            <span className="text-[#333]">•</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
