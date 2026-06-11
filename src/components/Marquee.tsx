import { motion } from 'motion/react';

export default function Marquee() {
  const text = "100% ARABICA • RE-BREWED EVERY 24 HOURS • ZERO SUGAR • SNAP-SEALED FRESHNESS • ".repeat(4);
  
  return (
    <div className="w-full overflow-hidden bg-[#FF4D00] py-3 flex border-y-[4px] border-[#0A0A0A] -my-[2px] relative z-20">
      <motion.div
        className="whitespace-nowrap flex font-black uppercase text-xl sm:text-2xl text-[#0A0A0A] tracking-widest"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
