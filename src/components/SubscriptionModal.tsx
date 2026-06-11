import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

const AVAILABLE_FLAVORS = [
  { id: 'f1', name: 'Classic Original', color: '#FF4D00' },
  { id: 'f2', name: 'Golden Hour', color: '#E2FB45' },
  { id: 'f3', name: 'Demon Mode', color: '#8B5CF6' }
];

export default function SubscriptionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState('Bi-weekly (12 Cans)');
  const { addToCart } = useCart();
  
  const [selections, setSelections] = useState<{ id: string, name: string, quantity: number, color: string }[]>(
    AVAILABLE_FLAVORS.map(f => ({ ...f, quantity: 0 }))
  );

  useEffect(() => {
    // Reset selections on open or when changing steps (back to 1) so it doesn't get weird
    if (isOpen) {
      setStep(1);
      setSelections(AVAILABLE_FLAVORS.map(f => ({ ...f, quantity: 0 })));
    }
  }, [isOpen]);

  // Derived size based on frequency
  const size = frequency.includes('24') ? 24 : 12;
  const totalSelected = selections.reduce((sum, item) => sum + item.quantity, 0);

  const handleUpdate = (id: string, delta: number) => {
    setSelections(prev => {
      const idx = prev.findIndex(p => p.id === id);
      const newSelections = [...prev];
      const newQuantity = newSelections[idx].quantity + delta;
      
      if (newQuantity < 0) return prev;
      if (delta > 0 && totalSelected >= size) return prev; // Cannot exceed box size

      newSelections[idx].quantity = newQuantity;
      return newSelections;
    });
  };

  const handleCheckoutCart = () => {
    let basePrice = frequency.includes('24') ? 4299 : 2299;
    
    // Describe the details
    const mixDetails = selections.filter(s => s.quantity > 0).map(s => `${s.quantity}x ${s.name}`).join(', ');

    addToCart({
      id: `sub_custom_${size}`,
      name: `Custom Routine`,
      price: basePrice,
      quantity: 1,
      details: `${frequency} - ${mixDetails}`
    });
    
    onClose();
  };

  // We only reset selections when size changes if the selected exceeds the new size
  useEffect(() => {
    if (totalSelected > size) {
       setSelections(AVAILABLE_FLAVORS.map(f => ({ ...f, quantity: 0 })));
    }
  }, [size]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          onClick={onClose} 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#151515] border border-[#333] w-full max-w-2xl rounded-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="p-6 border-b border-[#222] flex justify-between items-center bg-[#111]">
            <h2 className="text-2xl font-black uppercase text-[#F0F0F0] tracking-tight">Recurring Arsenal</h2>
            <button onClick={onClose} className="text-[#888] hover:text-[#FF4D00] transition-colors text-3xl leading-none">&times;</button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1 text-[#F0F0F0]">
            {step === 1 && (
               <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-6">
                 <h3 className="text-[#FF4D00] font-bold uppercase tracking-widest text-sm mb-4">Step 1: Delivery Frequency</h3>
                 <div className="grid grid-cols-1 gap-4">
                   {['Weekly (12 Cans)', 'Bi-weekly (12 Cans)', 'Monthly (24 Cans)'].map((freq) => (
                     <button 
                       key={freq}
                       onClick={() => setFrequency(freq)}
                       className={`p-5 border text-left flex justify-between items-center transition-all ${frequency === freq ? 'border-[#FF4D00] bg-[#FF4D00]/10 text-white shadow-[0_0_15px_rgba(255,77,0,0.15)]' : 'border-[#333] text-[#888] hover:border-[#555] bg-[#0A0A0A]'}`}
                     >
                       <div>
                         <span className="font-bold uppercase tracking-wide block">{freq}</span>
                         {frequency === freq && (
                           <span className="text-[#FF4D00] text-[10px] uppercase tracking-widest mt-2 block font-medium">
                             Next Drop Estim.: {(() => {
                               let days = 7;
                               if (freq.includes('Bi-weekly')) days = 14;
                               if (freq.includes('Monthly')) days = 30;
                               const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
                               return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                             })()}
                           </span>
                         )}
                       </div>
                       {frequency === freq && <span className="text-[#FF4D00]">✓</span>}
                     </button>
                   ))}
                 </div>
               </motion.div>
            )}

            {step === 2 && (
               <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-6">
                 <h3 className="text-[#FF4D00] font-bold uppercase tracking-widest text-sm mb-4">Step 2: Build Your Custom Mix</h3>
                 <p className="text-sm text-[#888] mb-6">Allocate exactly how many cans of each flavor you want in your {size}-can drop.</p>
                 
                 <div className="space-y-4">
                   {selections.map(flavor => (
                     <div key={flavor.id} className="flex items-center justify-between bg-[#111] border border-[#222] p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-4 h-4 rounded-full" style={{ backgroundColor: flavor.color }}></div>
                         <span className="font-bold uppercase tracking-wider text-[#F0F0F0] text-sm">{flavor.name}</span>
                       </div>
                       <div className="flex items-center gap-4 bg-[#0A0A0A] border border-[#333] p-1">
                         <button 
                           onClick={() => handleUpdate(flavor.id, -1)}
                           disabled={flavor.quantity === 0}
                           className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-white disabled:opacity-30 transition-colors"
                         >
                           -
                         </button>
                         <span className="w-4 text-center text-[#F0F0F0] font-bold">{flavor.quantity}</span>
                         <button 
                           onClick={() => handleUpdate(flavor.id, 1)}
                           disabled={totalSelected >= size}
                           className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#FF4D00] disabled:opacity-30 transition-colors"
                         >
                           +
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-[#888] mb-4">
                      <span>Selected: {totalSelected}/{size}</span>
                      {totalSelected === size && <span className="text-[#FF4D00]">Box Full!</span>}
                    </div>
                    <div className="h-2 bg-[#222] overflow-hidden flex">
                      {selections.map(s => s.quantity > 0 && (
                        <div 
                          key={`bar-${s.id}`} 
                          className="h-full transition-all duration-300" 
                          style={{ width: `${(s.quantity / size) * 100}%`, backgroundColor: s.color }}
                        ></div>
                      ))}
                    </div>
                  </div>
               </motion.div>
            )}
          </div>

          <div className="p-6 border-t border-[#222] bg-[#0A0A0A] flex justify-between items-center">
              {step > 1 ? (
                 <button onClick={() => setStep(step - 1)} className="text-[#888] font-bold uppercase text-sm hover:text-[#F0F0F0] tracking-wider transition-colors pt-1">BACK</button>
              ) : <div></div>}

              {step === 1 && (
                  <button onClick={() => setStep(step + 1)} className="bg-transparent border-2 border-[#F0F0F0] text-[#F0F0F0] px-8 py-3 font-bold uppercase text-sm hover:bg-[#F0F0F0] hover:text-black tracking-wider transition-colors">NEXT: CUSTOMIZE MIX</button>
              )}
              {step === 2 && (
                  <button 
                    onClick={handleCheckoutCart} 
                    disabled={totalSelected !== size}
                    className={`px-8 py-3 font-bold uppercase text-sm tracking-wider transition-colors ${totalSelected === size ? 'bg-[#FF4D00] border-2 border-[#FF4D00] text-black hover:bg-[#F0F0F0] hover:border-[#F0F0F0]' : 'bg-[#222] border-2 border-[#222] text-[#666] cursor-not-allowed'}`}
                  >
                    {totalSelected === size ? 'COMMIT TO ARSENAL' : `SELECT ${size - totalSelected} MORE`}
                  </button>
              )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
