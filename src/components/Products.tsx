import { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import BuildYourArsenal from './BuildYourArsenal';
import ProductQuickViewModal from './ProductQuickViewModal';

const products = [
  {
    name: 'Locked In',
    description: 'Our signature medium roast. Smooth, bold, and unapologetic.',
    notes: 'Chocolate, Toasted Nuts, Caramel',
    roast: 'Medium Roast',
    stats: { calories: 5, caffeine: '180mg', sugar: '0g', brewTime: '18 hrs' },
    color: '#FF4D00',
    id: 'prod_1',
    price: 150,
    oldPrice: 249
  },
  {
    name: 'Golden Hour',
    description: 'A bright light roast. Sweet aroma, highly crushable.',
    notes: 'Citrus, Honey, Floral',
    roast: 'Light Roast',
    stats: { calories: 5, caffeine: '160mg', sugar: '0g', brewTime: '16 hrs' },
    color: '#E2FB45',
    id: 'prod_2',
    price: 150,
    oldPrice: 249
  },
  {
    name: 'Demon Mode',
    description: 'A heavy-hitting dark roast. For the late-night hustlers.',
    notes: 'Dark Chocolate, Cherry, Smoke',
    roast: 'Dark Roast',
    stats: { calories: 15, caffeine: '200mg', sugar: '0g', brewTime: '24 hrs' },
    color: '#8B5CF6',
    id: 'prod_3',
    price: 150,
    oldPrice: 249
  }
];

export default function Products() {
  const { addToCart } = useCart();
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  return (
    <section className="py-24 bg-[#111] text-[#F0F0F0]" id="products">
      <div className="max-w-[1024px] mx-auto px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16 border-l-[4px] border-[#FF4D00] pl-5 sm:pl-6">
          <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-black uppercase tracking-[-2px] leading-[0.9] text-[#F0F0F0]">
            KNOW YOUR <br />
            <span className="text-[#FF4D00]">ARSENAL.</span>
          </h2>
          <p className="mt-6 text-[16px] sm:text-[18px] text-[#888] leading-[1.4] max-w-lg">
            We don't do mediocre. Each blend is meticulously crafted, steeped cold to eliminate acidity, and canned immediately to lock in the volatile aromas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx} 
              className="bg-[#0A0A0A] border border-[#222] p-6 sm:p-8 hover:border-[#444] transition-colors relative group flex flex-col cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div 
                className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity rounded-bl-full pointer-events-none"
                style={{ backgroundColor: product.color }}
              ></div>
              
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-[-1px] mb-2">{product.name}</h3>
              <p className="text-[#888] text-sm mb-6 h-12">{product.description}</p>
              
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-xs uppercase tracking-widest font-bold px-2 py-1 bg-[#222] text-[#F0F0F0] rounded-sm">{product.roast}</span>
                <span className="text-[10px] uppercase tracking-widest font-black px-2 py-1 bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/25 rounded-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-ping"></span>
                  CANNED &lt; 24H
                </span>
              </div>
              
              <div className="mb-8">
                <div className="text-[10px] text-[#666] uppercase tracking-[2px] mb-2 font-bold">Tasting Notes</div>
                <div className="text-[#F0F0F0] text-sm font-medium">{product.notes}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-[#222] py-6 mb-6">
                <div className="group-hover:translate-x-1 transition-transform">
                  <div className="text-[10px] text-[#666] uppercase tracking-[2px] font-bold">Calories</div>
                  <div className="text-lg font-mono text-[#F0F0F0] mt-1">{product.stats.calories}</div>
                </div>
                <div className="group-hover:translate-x-1 transition-transform delay-75">
                  <div className="text-[10px] text-[#666] uppercase tracking-[2px] font-bold">Caffeine</div>
                  <div className="text-lg font-mono text-[#F0F0F0] mt-1">{product.stats.caffeine}</div>
                </div>
                <div className="group-hover:translate-x-1 transition-transform delay-100">
                  <div className="text-[10px] text-[#666] uppercase tracking-[2px] font-bold">Sugar</div>
                  <div className="text-lg font-mono text-[#F0F0F0] mt-1">{product.stats.sugar}</div>
                </div>
                <div className="group-hover:translate-x-1 transition-transform delay-150">
                  <div className="text-[10px] text-[#666] uppercase tracking-[2px] font-bold">Brew Time</div>
                  <div className="text-lg font-mono text-[#F0F0F0] mt-1">{product.stats.brewTime}</div>
                </div>
              </div>
              
              <div className="flex flex-col mt-auto gap-2 relative z-10" onClick={(e) => e.stopPropagation()}>
                {product.oldPrice && (
                  <div className="bg-[#E2FB45]/10 text-[#E2FB45] text-[10px] font-bold uppercase tracking-widest px-2 py-1 self-start rounded-sm">
                    Save {Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-mono text-[#F0F0F0]">₹{product.price}</div>
                    <div className="text-sm font-mono text-[#666] line-through">₹{product.oldPrice}</div>
                  </div>
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      imageColor: product.color,
                      details: '6-Pack Case'
                    })}
                    className="bg-transparent text-[#F0F0F0] border-2 border-[#F0F0F0] px-4 py-2 font-bold uppercase text-xs hover:bg-[#F0F0F0] hover:text-black transition-colors"
                  >
                    ADD ARSENAL
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center border border-[#222] bg-[#0A0A0A] p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-[-1px] text-[#F0F0F0] mb-4">Want to try everything?</h3>
          <p className="text-[#888] text-sm max-w-md mx-auto mb-8">Mix and match flavors to curate your perfect fuel. Build a custom 6-pack or 12-pack case.</p>
          <button 
            onClick={() => setIsBuildModalOpen(true)}
            className="bg-[#FF4D00] text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#F0F0F0] transition-colors"
          >
            Build Your Arsenal
          </button>
        </div>

      </div>

      <BuildYourArsenal isOpen={isBuildModalOpen} onClose={() => setIsBuildModalOpen(false)} />
      <ProductQuickViewModal product={selectedProduct} isOpen={selectedProduct !== null} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
