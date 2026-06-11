import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: 'How long does the cold brew last?',
    answer: 'Since we can it fresh and use a specialized sealing process without preservatives, it stays perfectly fresh for up to 30 days when refrigerated. Always serve chilled.'
  },
  {
    question: 'Do you ship everywhere in Delhi NCR?',
    answer: 'Yes. We deliver across Delhi NCR. You typically receive your fresh cold brew within 24-48 hours via our local delivery partners.'
  },
  {
    question: 'Is there any added sugar?',
    answer: 'No cap. Zero sugar. Just pure, unadulterated energy.'
  },
  {
    question: 'Can I pause my subscription?',
    answer: 'Absolutely. You can manage, pause, or cancel your subscription at any time directly through the "Manage Arsenal" tab in the navigation menu.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#0A0A0A] text-[#F0F0F0] border-t border-[#222]" id="faq">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        
        <div className="mb-16 border-l-[4px] border-[#FF4D00] pl-5 sm:pl-6">
          <h2 className="text-4xl sm:text-[48px] font-black uppercase tracking-[-2px] leading-[0.9] text-[#F0F0F0]">
            NO BS <br />
            <span className="text-[#FF4D00]">FAQ.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-[#222] bg-[#111] overflow-hidden transition-colors hover:border-[#444]">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-[#151515] transition-colors focus:outline-none cursor-pointer"
              >
                <span className="font-bold uppercase tracking-tight text-[13px] sm:text-[15px]">{faq.question}</span>
                <span className="text-[#FF4D00] text-2xl font-light leading-none">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[#888] text-sm leading-relaxed border-t border-[#222] pt-4 mt-2">
                       {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
