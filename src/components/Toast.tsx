import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast, setToast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[120] bg-[#FF4D00] text-black px-6 py-4 rounded-sm shadow-[0_0_20px_rgba(255,77,0,0.3)] border border-[#FF4D00] flex items-center justify-between gap-4 max-w-sm"
        >
          <div className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            {toast}
          </div>
          <button onClick={() => setToast(null)} className="text-black/60 hover:text-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
