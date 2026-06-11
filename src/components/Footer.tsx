export default function Footer() {
  return (
    <footer className="bg-[#111] pt-24 pb-12 border-t border-[#222] text-[#F0F0F0]">
      <div className="max-w-[1024px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 text-left">
            <h2 className="text-3xl font-black uppercase tracking-[-1px] text-[#FF4D00] mb-4">BREW & CAN</h2>
            <p className="text-[#888] max-w-sm mb-6 leading-relaxed">
              Slide into our club for exclusive drops, early access, and <span className="text-[#F0F0F0] font-bold">10% off your first hit</span> of pure energy. No spam, just the good stuff.
            </p>
            <div className="flex bg-[#0A0A0A] border border-[#333] max-w-sm hover:border-[#FF4D00] transition-colors focus-within:border-[#FF4D00]">
              <input 
                type="email" 
                placeholder="JOIN OUR NEWSLETTER" 
                className="bg-transparent text-sm px-4 py-3 w-full outline-none text-[#F0F0F0] font-medium" 
              />
              <button className="bg-[#FF4D00] text-black font-bold uppercase text-[10px] tracking-widest px-6 hover:bg-[#F0F0F0] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#666]">Explore</h4>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <a href="#home" className="hover:text-[#FF4D00] transition-colors">Home</a>
              <a href="#products" className="hover:text-[#FF4D00] transition-colors">Products</a>
              <a href="#pricing" className="hover:text-[#FF4D00] transition-colors">Subscriptions</a>
              <a href="#story" className="hover:text-[#FF4D00] transition-colors">Our Story</a>
              <a href="#faq" className="hover:text-[#FF4D00] transition-colors">FAQ</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#666]">Legal</h4>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <a href="#" className="hover:text-[#F0F0F0] transition-colors text-[#888]">Privacy Policy</a>
              <a href="#" className="hover:text-[#F0F0F0] transition-colors text-[#888]">Terms of Service</a>
              <a href="#" className="hover:text-[#F0F0F0] transition-colors text-[#888]">Shipping Info</a>
              <a href="#" className="hover:text-[#F0F0F0] transition-colors text-[#888]">Refund Policy</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-[#666] uppercase tracking-widest">
          <div>© {new Date().getFullYear()} Brew & Can. All rights reserved. Built for the Restless.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#FF4D00] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#FF4D00] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#FF4D00] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
