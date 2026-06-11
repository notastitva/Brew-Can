import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function ProductQuickViewModal({ product, isOpen, onClose }: { product: any; isOpen: boolean; onClose: () => void }) {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           exit={{ opacity: 0 }} 
           className="absolute inset-0 bg-black/80 backdrop-blur-md" 
           onClick={onClose} 
        />
        <motion.div 
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 20 }}
           className="bg-[#0A0A0A] border border-[#333] w-full max-w-2xl rounded-md relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="p-6 border-b border-[#222] flex justify-between items-center bg-[#111]">
            <h2 className="text-xl font-black uppercase text-[#F0F0F0] tracking-widest">{product.name}</h2>
            <button onClick={onClose} className="text-[#888] hover:text-[#FF4D00] transition-colors text-2xl leading-none">&times;</button>
          </div>

          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div 
                className="w-full aspect-[3/4] bg-[#111] border border-[#222] flex items-center justify-center rounded-sm mb-6"
                style={{ borderBottomColor: product.color, borderBottomWidth: '8px' }}
              >
                <div className="w-1/2 aspect-[1/2] border-4 rounded-sm" style={{ borderColor: product.color, backgroundColor: '#0A0A0A' }}></div>
              </div>
              <div className="bg-[#111] p-4 text-[10px] text-[#888] uppercase tracking-widest font-bold border border-[#222]">
                <p className="mb-2"><strong>Roast:</strong> {product.roast}</p>
                <p className="mb-2"><strong>Notes:</strong> {product.notes}</p>
                <p><strong>Ingredients:</strong> Filtered Water, 100% Arabica Coffee.</p>
              </div>

              <div className="mt-6 bg-[#111] border border-[#222] p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E2FB45]"></div>
                <div className="text-[10px] text-[#E2FB45] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Verified Intel
                </div>
                <div className="italic text-xs text-[#888] leading-relaxed relative z-10">
                  "{product.id === 'prod_1' ? "This got me through a 48-hour coding sprint. I can hear colors now. 5/5" : product.id === 'prod_2' ? "Smoother than my pick-up lines and hits like a freight train." : "Literal rocket fuel. Replaced my pre-workout and my therapist."}"
                </div>
                <div className="text-[9px] uppercase tracking-widest text-[#666] mt-3 font-bold text-right">— {product.id === 'prod_1' ? "DEV_NULL" : product.id === 'prod_2' ? "NIGHT_OWL" : "DEMON_CHILD"}</div>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-[#888] text-sm mb-6">{product.description}</p>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="bg-[#FF4D00]/5 border border-[#FF4D00]/20 p-4 flex justify-between items-center rounded-sm">
                  <div>
                    <div className="text-[10px] text-[#FF4D00] uppercase tracking-widest font-black flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-ping" />
                      FRESHNESS CORE
                    </div>
                    <div className="text-[9px] text-[#666] mt-0.5 uppercase">Canned &amp; Dispatched</div>
                  </div>
                  <div className="text-lg font-mono font-black text-[#FF4D00]">&lt; 24H AGO</div>
                </div>
                <div className="bg-[#111] border border-[#222] p-4 flex justify-between items-center">
                  <div className="text-[10px] text-[#888] uppercase tracking-widest font-bold">Caffeine</div>
                  <div className="text-lg font-mono text-[#F0F0F0]">{product.stats.caffeine}</div>
                </div>
                <div className="bg-[#111] border border-[#222] p-4 flex justify-between items-center">
                  <div className="text-[10px] text-[#888] uppercase tracking-widest font-bold">Calories</div>
                  <div className="text-lg font-mono text-[#F0F0F0]">{product.stats.calories}</div>
                </div>
                <div className="bg-[#111] border border-[#222] p-4 flex justify-between items-center">
                  <div className="text-[10px] text-[#888] uppercase tracking-widest font-bold">Brew Time</div>
                  <div className="text-lg font-mono text-[#F0F0F0]">{product.stats.brewTime}</div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-[#222]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-mono text-[#F0F0F0]">₹{product.price}</div>
                    {product.oldPrice && <div className="text-lg font-mono text-[#666] line-through">₹{product.oldPrice}</div>}
                  </div>
                  {product.oldPrice && (
                    <div className="bg-[#E2FB45]/10 text-[#E2FB45] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                      Save {Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      imageColor: product.color,
                      details: '6-Pack Case'
                    });
                    onClose();
                  }}
                  className="w-full bg-[#FF4D00] text-black border-2 border-[#FF4D00] font-bold uppercase tracking-widest py-4 text-sm hover:bg-transparent hover:text-[#FF4D00] transition-colors rounded-sm"
                >
                  COMMIT TO ARSENAL
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
