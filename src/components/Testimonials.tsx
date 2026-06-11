import { motion } from 'motion/react';

const testimonials = [
  {
    name: "Rahul M.",
    role: "Software Engineer",
    text: "Literal rocket fuel. Demon Mode got me through an entire weekend hackathon. Easiest choice ever.",
  },
  {
    name: "Sneha T.",
    role: "Designer",
    text: "Finally a cold brew that doesn't taste like ashtray water. Golden Hour is ridiculously smooth.",
  },
  {
    name: "Aman K.",
    role: "Founder",
    text: "Subscription model makes sense. I don't even think about coffee anymore, it just shows up cold and ready.",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0A0A0A] text-[#F0F0F0] border-t border-[#222]">
      <div className="max-w-[1024px] mx-auto px-6 lg:px-8">
        <div className="mb-16 border-l-[4px] border-[#FF4D00] pl-5 sm:pl-6">
          <h2 className="text-4xl sm:text-[48px] font-black uppercase tracking-[-2px] leading-[0.9] text-[#F0F0F0]">
            WORD ON THE <br />
            <span className="text-[#FF4D00]">STREET.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx}
              className="p-8 bg-[#111] border border-[#222] hover:border-[#FF4D00] transition-colors"
            >
              <div className="flex gap-1 mb-6 text-[#FF4D00]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-[#888] text-lg mb-8 leading-[1.5]">"{t.text}"</p>
              <div className="mt-auto">
                <div className="font-bold uppercase tracking-widest text-[#F0F0F0] text-sm">{t.name}</div>
                <div className="text-[10px] uppercase tracking-[2px] text-[#FF4D00] mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
