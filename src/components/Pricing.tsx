const plans = [
  {
    name: 'Single Drop',
    price: '₹900',
    description: '6 Cans / One-time delivery',
    features: ['6x 250ml Cans', 'Brewed < 24 hrs ago', 'Standard shipping'],
    buttonText: 'Grab a Pack',
    isPopular: false,
  },
  {
    name: 'The Ritual Subscription',
    price: '₹1,650',
    description: '12 Cans / Bi-weekly delivery',
    features: ['Never out of stock', 'Exclusive seasonal roasts', 'Skip or cancel anytime'],
    buttonText: 'Join the Club',
    isPopular: true,
  },
  {
    name: 'Stockpile',
    price: '₹3,000',
    description: '24 Cans / Custom delivery',
    features: ['Best value per can', 'Free priority shipping', 'Custom delivery schedule'],
    buttonText: 'Secure the Bag',
    isPopular: false,
  }
];

export default function Pricing({ onSubscribeClick }: { onSubscribeClick: () => void }) {
  return (
    <section className="py-24 bg-[#0A0A0A] text-[#F0F0F0] relative" id="pricing">
      <div className="max-w-[1024px] mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-l-4 border-[#FF4D00] pl-6 md:pl-8">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-[-2px] sm:text-[64px] text-[#F0F0F0] leading-none mb-4">
              COMMIT TO <span className="text-[#FF4D00]">ARSENAL</span>
            </h2>
            <p className="text-[#888] text-lg max-w-md">
              No long commitments unless you want them. Purely good cold brew.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-[30px] bg-[#151515] border rounded-[24px] transition-colors ${plan.isPopular ? 'border-[#FF4D00] shadow-[0_0_20px_rgba(255,77,0,0.1)]' : 'border-[#222]'}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-4">
                  <span className="bg-[#FF4D00] text-black px-4 py-1.5 font-bold uppercase tracking-wider text-xs rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <div className="text-[11px] text-[#666] tracking-[2px] uppercase mb-[15px]">{plan.name}</div>
                <div className="text-[48px] font-light text-[#F0F0F0] leading-none mb-[5px]">{plan.price}</div>
                <div className="text-[14px] text-[#666]">{plan.description}</div>
              </div>

              <ul className="flex-1 space-y-[8px] mb-[30px] list-none">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-[13px] text-[#AAA]">
                    <span className="text-[#FF4D00] font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onSubscribeClick}
                className={`w-full py-[18px] font-bold uppercase text-[14px] leading-none transition-colors border-2 cursor-pointer ${
                  plan.isPopular 
                    ? 'bg-transparent text-[#F0F0F0] border-[#F0F0F0] hover:bg-[#F0F0F0] hover:text-[#000]' 
                    : 'bg-transparent border-[#F0F0F0] text-[#F0F0F0] hover:bg-[#F0F0F0] hover:text-[#000]'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
