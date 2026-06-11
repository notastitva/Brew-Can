import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onCartClick, onManageClick }: { onCartClick?: () => void, onManageClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <>
      <nav className="fixed top-0 inset-x-0 h-20 z-50 flex items-center bg-[#0A0A0A] border-b border-[#222] text-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-between items-center">
          <div className="font-black text-[24px] sm:text-[32px] tracking-[-2px] uppercase drop-shadow-md text-[#FF4D00]">
            BREW & CAN
          </div>
          
          <div className="hidden lg:flex gap-6 xl:gap-8 items-center font-bold uppercase tracking-widest text-sm text-[#F0F0F0]">
            <a href="#home" className="hover:text-[#FF4D00] transition-colors">Home</a>
            <a href="#story" className="hover:text-[#FF4D00] transition-colors">Our Story</a>
            <a href="#freshness" className="hover:text-[#FF4D00] transition-colors">Freshness</a>
            <a href="#pricing" className="hover:text-[#FF4D00] transition-colors">Subscriptions</a>
            <a href="#products" className="hover:text-[#FF4D00] transition-colors">Products</a>
            <a href="#faq" className="hover:text-[#FF4D00] transition-colors">FAQ</a>
            <button onClick={onManageClick} className="hover:text-[#FF4D00] transition-colors">MANAGE ARSENAL</button>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="bg-transparent text-[#F0F0F0] border-2 border-[#F0F0F0] px-4 sm:px-6 py-2 sm:py-3 font-bold uppercase text-xs sm:text-sm hover:bg-[#F0F0F0] hover:text-black transition-colors w-auto sm:w-[120px]">
              CART [{cartCount}]
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden text-[#F0F0F0] focus:outline-none flex flex-col justify-center items-center w-8 h-8 space-y-[5px]"
            >
              <span className={`block w-6 h-[2px] bg-[#F0F0F0] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
              <span className={`block w-6 h-[2px] bg-[#F0F0F0] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-[2px] bg-[#F0F0F0] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-28 px-6 pb-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 font-black uppercase tracking-widest text-2xl text-[#F0F0F0] mt-8">
              <a href="#home" onClick={() => setIsOpen(false)} className="hover:text-[#FF4D00] transition-colors">Home</a>
              <a href="#story" onClick={() => setIsOpen(false)} className="hover:text-[#FF4D00] transition-colors">Our Story</a>
              <a href="#freshness" onClick={() => setIsOpen(false)} className="hover:text-[#FF4D00] transition-colors">Freshness</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="hover:text-[#FF4D00] transition-colors">Subscriptions</a>
              <a href="#products" onClick={() => setIsOpen(false)} className="hover:text-[#FF4D00] transition-colors">Products</a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="hover:text-[#FF4D00] transition-colors">FAQ</a>
              <button 
                onClick={() => { setIsOpen(false); onManageClick(); }} 
                className="hover:text-[#FF4D00] transition-colors text-left"
              >
                MANAGE ARSENAL
              </button>
            </div>
            <div className="mt-auto border-t border-[#222] pt-8">
               <div className="text-[#888] text-sm uppercase tracking-widest font-bold">100% Arabica Pure Energy</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
