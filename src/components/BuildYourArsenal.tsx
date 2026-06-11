import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

const AVAILABLE_FLAVORS = [
  { id: 'f1', name: 'Classic Original', color: '#FF4D00' },
  { id: 'f2', name: 'Golden Hour', color: '#E2FB45' },
  { id: 'f3', name: 'Demon Mode', color: '#8B5CF6' }
];

export default function BuildYourArsenal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState<6 | 12>(6);
  const [selections, setSelections] = useState<{ id: string, name: string, quantity: number, color: string }[]>(
    AVAILABLE_FLAVORS.map(f => ({ ...f, quantity: 0 }))
  );

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

  const handleAddToCart = () => {
    if (totalSelected !== size) return;

    // Describe the details
    const details = selections.filter(s => s.quantity > 0).map(s => `${s.quantity}x ${s.name}`).join(', ');

    addToCart({
      id: `custom_box_${size}`,
      name: `Custom ${size}-Pack Arsenal`,
      price: size === 6 ? 899 : 1499,
      quantity: 1,
      imageColor: '#FFFFFF',
      details
    });

    onClose();
  };

  if (!isOpen) return null;

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
           className="bg-[#0A0A0A] border border-[#333] w-full max-w-lg rounded-md relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="p-6 border-b border-[#222] flex justify-between items-center bg-[#111]">
            <h2 className="text-xl font-black uppercase text-[#F0F0F0] tracking-widest">Build Your Arsenal</h2>
            <button onClick={onClose} className="text-[#888] hover:text-[#FF4D00] transition-colors text-2xl leading-none">&times;</button>
          </div>

          <div className="p-6 overflow-y-auto">
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => { setSize(6); setSelections(AVAILABLE_FLAVORS.map(f => ({ ...f, quantity: 0 }))); }}
                className={`flex-1 p-4 border ${size === 6 ? 'border-[#FF4D00] text-[#FF4D00] bg-[#FF4D00]/10' : 'border-[#333] text-[#888]'} font-bold uppercase tracking-widest text-sm text-center transition-colors`}
              >
                6-Pack
                <span className="block text-xs mt-1 opacity-80">₹899</span>
              </button>
              <button 
                onClick={() => { setSize(12); setSelections(AVAILABLE_FLAVORS.map(f => ({ ...f, quantity: 0 }))); }}
                className={`flex-1 p-4 border ${size === 12 ? 'border-[#FF4D00] text-[#FF4D00] bg-[#FF4D00]/10' : 'border-[#333] text-[#888]'} font-bold uppercase tracking-widest text-sm text-center transition-colors`}
              >
                12-Pack
                <span className="block text-xs mt-1 opacity-80">₹1499</span>
              </button>
            </div>

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
              <div className="h-2 bg-[#222] overflow-hidden mb-6 flex">
                {selections.map(s => s.quantity > 0 && (
                  <div 
                    key={`bar-${s.id}`} 
                    className="h-full transition-all duration-300" 
                    style={{ width: `${(s.quantity / size) * 100}%`, backgroundColor: s.color }}
                  ></div>
                ))}
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={totalSelected !== size}
                className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-colors ${totalSelected === size ? 'bg-[#FF4D00] text-black hover:bg-[#F0F0F0]' : 'bg-[#222] text-[#666] cursor-not-allowed'}`}
              >
                {totalSelected === size ? 'COMMIT TO ARSENAL' : `Select ${size - totalSelected} more cans`}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
