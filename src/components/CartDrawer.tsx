import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import RazorpayMock from './RazorpayMock';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, total, setIsCartOpen: setGlobalCartOpen } = useCart();
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isCheckoutPhase, setIsCheckoutPhase] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const freeShippingThreshold = 1500;
  const progressToFreeShipping = Math.min((total / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - total, 0);

  const handlePaymentSuccess = () => {
    setIsRazorpayOpen(false);
    alert('Payment successful! Your order has been placed.');
    setGlobalCartOpen(false);
    setIsCheckoutPhase(false);
    // You could also clear the cart here
  };

  const handleCheckoutClick = () => {
    if (total < 899) {
      alert('Minimum checkout value is ₹899. Please add more items to your cart.');
    } else {
      setIsCheckoutPhase(true);
    }
  };
  
  const handlePayClick = () => {
    if (formRef.current && formRef.current.reportValidity()) {
      setIsRazorpayOpen(true);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
            onClick={() => {
              setIsCartOpen(false);
              setTimeout(() => setIsCheckoutPhase(false), 300);
            }}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0A0A0A] border-l border-[#222] z-50 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center p-6 border-b border-[#222]">
              <div className="flex items-center gap-4">
                {isCheckoutPhase && (
                  <button onClick={() => setIsCheckoutPhase(false)} className="text-[#888] hover:text-[#F0F0F0] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                )}
                <h2 className="text-xl font-black uppercase tracking-widest text-[#F0F0F0]">{isCheckoutPhase ? 'Shipping' : 'Your Cart'}</h2>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setTimeout(() => setIsCheckoutPhase(false), 300);
                }}
                className="text-[#888] hover:text-[#FF4D00] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!isCheckoutPhase ? (
                <div className="space-y-6">
                  {items.length === 0 ? (
                    <div className="text-[#888] text-center mt-10 uppercase tracking-widest font-bold text-sm">
                      Your cart is empty. <br/><span className="text-[#F0F0F0] mt-2 block">Time to get locked in.</span>
                    </div>
                  ) : (
                    <>
                      <div className="bg-[#111] p-4 text-center border border-[#222]">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#F0F0F0] mb-2">
                          {amountToFreeShipping > 0 
                            ? `You're ₹${amountToFreeShipping.toFixed(2)} away from Free Shipping!` 
                            : 'You have unlocked Free Shipping!'}
                        </p>
                        <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#FF4D00] h-full transition-all duration-500 ease-out"
                            style={{ width: `${progressToFreeShipping}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 border-b border-[#222] pb-6">
                            <div 
                              className="w-16 h-20 bg-[#111] border border-[#222] flex items-center justify-center shrink-0 rounded-sm"
                              style={{ borderBottomColor: item.imageColor || '#333', borderBottomWidth: '4px' }}
                            >
                              <div className="w-6 h-10 border-2 rounded-sm" style={{ borderColor: item.imageColor || '#555', backgroundColor: '#0A0A0A' }}></div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h3 className="text-[#F0F0F0] font-bold uppercase tracking-wider text-sm">{item.name}</h3>
                                  <button onClick={() => removeFromCart(item.id, item.details)} className="text-[#888] hover:text-[#FF4D00]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                  </button>
                                </div>
                                {item.details && <p className="text-[#888] text-[10px] uppercase tracking-widest mt-1">{item.details}</p>}
                                <div className="text-[#FF4D00] font-bold mt-1 text-sm">₹{item.price.toFixed(2)}</div>
                              </div>
                              <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center border border-[#333] bg-[#0A0A0A] rounded-sm h-8">
                                  <button className="px-3 text-[#F0F0F0] hover:text-[#FF4D00] transition-colors" onClick={() => updateQuantity(item.id, item.details, item.quantity - 1)}>-</button>
                                  <span className="text-[#F0F0F0] text-sm tabular-nums w-4 text-center">{item.quantity}</span>
                                  <button className="px-3 text-[#F0F0F0] hover:text-[#FF4D00] transition-colors" onClick={() => updateQuantity(item.id, item.details, item.quantity + 1)}>+</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <form ref={formRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">First Name</label>
                      <input required type="text" placeholder="Rahul" className="w-full bg-[#0A0A0A] border border-[#333] text-[#F0F0F0] p-3 outline-none focus:border-[#FF4D00] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">Last Name</label>
                      <input required type="text" placeholder="Sharma" className="w-full bg-[#0A0A0A] border border-[#333] text-[#F0F0F0] p-3 outline-none focus:border-[#FF4D00] transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">Email Address</label>
                      <input required type="email" placeholder="rahul@example.com" className="w-full bg-[#0A0A0A] border border-[#333] text-[#F0F0F0] p-3 outline-none focus:border-[#FF4D00] transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">Delivery Address</label>
                      <textarea required placeholder="Apartment, Street Name, Floor" rows={2} className="w-full bg-[#0A0A0A] border border-[#333] text-[#F0F0F0] p-3 outline-none focus:border-[#FF4D00] transition-colors resize-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">City (Delhi NCR Only)</label>
                      <select required className="w-full bg-[#0A0A0A] border border-[#333] text-[#F0F0F0] p-3 outline-none focus:border-[#FF4D00] transition-colors appearance-none">
                         <option value="">Select City</option>
                         <option>New Delhi</option>
                         <option>Gurugram</option>
                         <option>Noida</option>
                         <option>Faridabad</option>
                         <option>Ghaziabad</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">Pincode</label>
                      <input required type="text" placeholder="110001" pattern="[0-9]{6}" title="Please enter a valid 6-digit pincode" className="w-full bg-[#0A0A0A] border border-[#333] text-[#F0F0F0] p-3 outline-none focus:border-[#FF4D00] transition-colors" />
                    </div>
                  </form>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#222] bg-[#0A0A0A]">
                <div className="flex justify-between items-center mb-2 text-[#F0F0F0] font-bold uppercase tracking-widest">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-lg">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-[#888] font-bold uppercase tracking-widest">
                  <span className="text-xs">Shipping</span>
                  <span className="text-xs">{amountToFreeShipping > 0 ? `₹99.00` : 'FREE'}</span>
                </div>
                {!isCheckoutPhase ? (
                  <div className="space-y-4">
                    {total < 899 && (
                      <div className="text-[#FF4D00] text-[10px] font-bold uppercase tracking-widest text-center bg-[#FF4D00]/10 py-2 border border-[#FF4D00]/20">
                        Minimum checkout value is ₹899
                      </div>
                    )}
                    <button 
                      onClick={handleCheckoutClick}
                      className={`w-full ${total < 899 ? 'bg-[#222] text-[#666] border-[#222] cursor-not-allowed' : 'bg-[#FF4D00] text-black border-[#FF4D00] hover:bg-[#F0F0F0] hover:border-[#F0F0F0]'} border-2 px-8 py-4 font-bold uppercase tracking-widest transition-colors text-sm rounded-sm flex items-center justify-center gap-2`}
                    >
                      CHECKOUT ARSENAL
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handlePayClick}
                    className="w-full bg-[#3395FF] border-2 border-[#3395FF] text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#2075D3] hover:border-[#2075D3] transition-colors text-sm rounded-sm flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
                    PAY VIA RAZORPAY {(total + (amountToFreeShipping > 0 ? 99 : 0)).toFixed(2)}
                  </button>
                )}
              </div>
            )}
          </motion.div>
          <RazorpayMock 
            isOpen={isRazorpayOpen} 
            amount={total + (amountToFreeShipping > 0 ? 99 : 0)} 
            onSuccess={handlePaymentSuccess} 
            onClose={() => setIsRazorpayOpen(false)} 
          />
        </>
      )}
    </AnimatePresence>
  );
}
