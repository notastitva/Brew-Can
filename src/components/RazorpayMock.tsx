import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function RazorpayMock({ isOpen, amount, onSuccess, onClose }: { isOpen: boolean, amount: number, onSuccess: () => void, onClose: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-[400px] rounded-md relative z-10 overflow-hidden flex flex-col shadow-2xl font-sans text-gray-900"
          >
            {loading ? (
              <div className="p-12 flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-4 border-[#3395FF] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-sm font-medium text-gray-500">Loading Razorpay...</div>
              </div>
            ) : (
              <>
                <div className="bg-[#3395FF] p-6 text-white text-center relative border-b-4 border-black/10">
                  <div className="text-xl font-bold mb-1 tracking-tight">Brew & Can</div>
                  <div className="text-3xl font-black tabular-nums">₹{amount}.00</div>
                  <button onClick={onClose} className="absolute right-4 top-4 opacity-70 hover:opacity-100 text-xl font-light">&times;</button>
                </div>
                
                <div className="p-6">
                  <div className="mb-4 text-sm font-medium border-b pb-2 text-gray-600 uppercase tracking-widest text-[10px]">Test Payment Options</div>
                  
                  <div className="space-y-3">
                    <button onClick={onSuccess} className="w-full flex items-center justify-between p-3 border rounded border-gray-200 hover:border-[#3395FF] hover:bg-blue-50 transition-colors text-left group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500 group-hover:bg-[#3395FF] group-hover:text-white transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                        </div>
                        <span className="font-medium text-sm">Credit / Debit Card</span>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                    
                    <button onClick={onSuccess} className="w-full flex items-center justify-between p-3 border rounded border-gray-200 hover:border-[#3395FF] hover:bg-blue-50 transition-colors text-left group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500 group-hover:bg-[#3395FF] group-hover:text-white transition-colors font-bold text-[10px]">
                          UPI
                        </div>
                        <span className="font-medium text-sm">UPI / QR</span>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-dashed border-gray-200 text-center">
                    <div className="text-[10px] text-gray-400 font-medium uppercase flex items-center justify-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></svg>
                      Secured by Razorpay
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
