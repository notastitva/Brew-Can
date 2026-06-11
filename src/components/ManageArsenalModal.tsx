import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ManageArsenalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'login' | 'manage'>('login');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  
  // Mock subscription state
  const [subscriptionState, setSubscriptionState] = useState<'active' | 'paused' | 'cancelled'>('active');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && orderId) {
      setStep('manage');
      setError('');
    } else {
      setError('Please enter both Email and Order ID.');
    }
  };

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
           className="bg-[#0A0A0A] border border-[#333] w-full max-w-md rounded-md relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="p-6 border-b border-[#222] flex justify-between items-center bg-[#111]">
            <h2 className="text-xl font-black uppercase text-[#F0F0F0] tracking-widest">Manage Arsenal</h2>
            <button onClick={onClose} className="text-[#888] hover:text-[#FF4D00] transition-colors text-2xl leading-none">&times;</button>
          </div>

          <div className="p-6 overflow-y-auto">
            {step === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <p className="text-[#888] text-sm mb-6">Enter your email and order ID to manage your subscription drop settings, pause deliveries, or cancel your plan.</p>
                
                {error && <div className="text-[#FF4D00] text-xs font-bold uppercase tracking-wider">{error}</div>}

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" 
                    className="w-full bg-[#111] border border-[#333] text-[#F0F0F0] p-3 outline-none focus:border-[#FF4D00] transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">Order ID</label>
                  <input 
                    type="text" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="ORD-XXXXX" 
                    className="w-full bg-[#111] border border-[#333] text-[#F0F0F0] p-3 outline-none focus:border-[#FF4D00] transition-colors uppercase" 
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-[#FF4D00] text-black font-bold uppercase tracking-widest py-4 hover:bg-[#F0F0F0] transition-colors text-sm rounded-sm">
                    Access Portal
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                
                {/* Gamified Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#111] border border-[#222] p-4 text-center rounded-sm">
                    <div className="text-[10px] text-[#888] uppercase tracking-widest font-bold mb-1">Rank</div>
                    <div className="text-[#FF4D00] font-black uppercase tracking-wider text-sm">Caffeine Demon</div>
                  </div>
                  <div className="bg-[#111] border border-[#222] p-4 text-center rounded-sm">
                    <div className="text-[10px] text-[#888] uppercase tracking-widest font-bold mb-1">Cans Destroyed</div>
                    <div className="text-[#F0F0F0] font-black uppercase tracking-wider text-xl">84</div>
                  </div>
                  <div className="bg-[#111] border border-[#222] p-4 text-center rounded-sm col-span-2">
                    <div className="text-[10px] text-[#888] uppercase tracking-widest font-bold mb-1">Total Caffeine Consumed</div>
                    <div className="text-[#E2FB45] font-black uppercase tracking-wider items-end inline-flex gap-1">
                      <span className="text-2xl leading-none">14,200</span>
                      <span className="text-sm">mg</span>
                    </div>
                  </div>
                </div>

                {/* Live Order Tracking */}
                <div className="bg-[#111] border border-[#222] p-5 mb-6">
                  <h3 className="font-bold uppercase tracking-widest text-[#F0F0F0] text-sm mb-6">Latest Drop Radar</h3>
                  <div className="relative">
                    <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-[#222]"></div>
                    <div className="space-y-6 relative z-10">
                      {[ 
                        { status: 'Order Received', time: '10:42 AM', done: true },
                        { status: 'Brewing', time: '11:15 AM', done: true },
                        { status: 'In Transit', time: 'Out for delivery', done: false, current: true },
                        { status: 'Dropped at Base', time: 'Pending', done: false }
                      ].map((step, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center bg-[#111] ${step.done ? 'border-[#FF4D00]' : step.current ? 'border-[#E2FB45]' : 'border-[#333]'}`}>
                            {(step.done || step.current) && <div className={`w-2 h-2 rounded-full ${step.done ? 'bg-[#FF4D00]' : 'bg-[#E2FB45] animate-pulse'}`}></div>}
                          </div>
                          <div>
                            <div className={`text-sm font-bold uppercase tracking-widest ${step.done ? 'text-[#F0F0F0]' : step.current ? 'text-[#E2FB45]' : 'text-[#666]'}`}>{step.status}</div>
                            <div className="text-[10px] text-[#888] font-mono mt-1">{step.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#111] border border-[#222] p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold uppercase tracking-widest text-sm text-[#F0F0F0]">Current Sub</h3>
                      <p className="text-[#888] text-xs mt-1">Bi-weekly (12 Cans) • Locked In</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${subscriptionState === 'active' ? 'bg-[#E2FB45]/20 text-[#E2FB45]' : subscriptionState === 'paused' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-500'}`}>
                        {subscriptionState}
                      </span>
                    </div>
                  </div>
                  
                  {subscriptionState !== 'cancelled' && (
                    <div className="text-[#888] text-xs mb-4">
                      Next Drop: <span className="text-[#F0F0F0]">{subscriptionState === 'paused' ? 'PAUSED' : 'Jun 24, 2026'}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 py-2 border-t border-[#333] mt-2">
                    {subscriptionState === 'active' && (
                      <button 
                        onClick={() => setSubscriptionState('paused')}
                        className="w-full py-3 border border-[#F0F0F0] text-[#F0F0F0] text-xs font-bold uppercase tracking-widest hover:bg-[#F0F0F0] hover:text-black transition-colors"
                      >
                        Pause Subscription
                      </button>
                    )}
                    {subscriptionState === 'paused' && (
                      <button 
                        onClick={() => setSubscriptionState('active')}
                        className="w-full py-3 bg-[#FF4D00] text-black border border-[#FF4D00] text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-[#FF4D00] transition-colors"
                      >
                        Resume Subscription
                      </button>
                    )}
                    {subscriptionState !== 'cancelled' && (
                      <button 
                        onClick={() => setSubscriptionState('cancelled')}
                        className="w-full py-3 border border-red-900/50 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-900/20 transition-colors"
                      >
                        Cancel Plan
                      </button>
                    )}
                  </div>
                </div>

                {subscriptionState === 'cancelled' && (
                   <p className="text-xs text-[#888] text-center max-w-xs mx-auto">Your subscription is cancelled. You can set up a new drop from the main store.</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
