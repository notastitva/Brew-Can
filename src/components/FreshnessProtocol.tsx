import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Zap, ShieldCheck, Thermometer, Droplets, Activity, ChevronRight } from 'lucide-react';

export default function FreshnessProtocol() {
  const [activeStep, setActiveStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 42, seconds: 12 });
  const [batchId, setBatchId] = useState('');
  const [metrics, setMetrics] = useState({
    tds: '1.45%',
    temp: '4.2°C',
    duration: '18.2 hrs',
    statusTag: 'STEEP STABILITY LOCK'
  });

  // Calculate high-tech dynamic batch ID & last-brewed stats
  useEffect(() => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const hrBucket = Math.floor(now.getHours() / 4);
    setBatchId(`BATCH-${day}${month}-${hrBucket}`);

    // Dynamic metrics that shift slightly to feel "live-calculated"
    const interval = setInterval(() => {
      const randomTds = (1.4 + Math.random() * 0.1).toFixed(2) + '%';
      const randomTemp = (4.0 + Math.random() * 0.4).toFixed(1) + '°C';
      setMetrics(prev => ({
        ...prev,
        tds: randomTds,
        temp: randomTemp
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Ticking countdown until the next batch cycle launches
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 4 hr cycle
          return { hours: 3, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      title: "Cold-Water Infusion",
      hours: "0h - 18h",
      desc: "Beans are coarse-ground and slow-steeped at exactly 4°C in triple-purified water. Eliminates all bitter acids, extracting sweet premium notes.",
      icon: Droplets,
      metric: "EXTRACTION TEMP: 4.1°C"
    },
    {
      title: "Ultra triple-filtration",
      hours: "18h - 20h",
      desc: "Pre-clarified and run through our sequential 10-micron filter array. Removes all heavy sediments for a pristine, crisp, glass-like mouthfeel.",
      icon: Activity,
      metric: "CLARITY: 99.8%"
    },
    {
      title: "Snap-Sealed Canning",
      hours: "20h - 24h",
      desc: "Nitrogen flushed and pressure sealed into aluminum cans within minutes, purging all reactive oxygen to permanently trap fragile flavor volatiles.",
      icon: Zap,
      metric: "O2 HEADSPACE: < 0.01%"
    }
  ];

  return (
    <section className="py-24 bg-[#0F0F0F] border-y border-[#222] relative overflow-hidden" id="freshness">
      {/* Background scanline & glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_95%,rgba(255,77,0,0.03)_100%)] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FF4D00]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#E2FB45]/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1024px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-l-4 border-[#FF4D00] pl-6 md:pl-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF4D00] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse"></span>
              FRESHNESS ASSURED
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-black uppercase tracking-[-2px] leading-[0.9] text-[#F0F0F0]">
              THE 24H BREW <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8040]">PROTOCOL.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#888] max-w-xl">
              We operate on absolute speeds. Every can in your shipment is brewed, packed, and primed within 24 hours of dispatch. No warehouse stagnation, no artificial shelf-life extenders. 
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Cockpit Status - Left Panel (7 cols) */}
          <div className="lg:col-span-7 bg-[#050505] border border-[#2A2A2A] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF4D00]/40 to-transparent" />
            
            {/* Header telemetry info */}
            <div>
              <div className="flex justify-between items-center bg-[#111] px-4 py-2 border border-[#222] mb-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#F0F0F0] uppercase tracking-widest font-black">ACTIVE DELHI NCR EXTRAC.</span>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-[#888] tracking-wider uppercase font-medium">{batchId}</div>
              </div>

              {/* Big status and live telemetry metrics */}
              <div className="mb-8">
                <div className="text-[10px] text-[#666] uppercase tracking-[2px] font-bold mb-1">CURRENT BATCH PROGRESS</div>
                <div className="text-2xl sm:text-3xl font-black uppercase text-[#F0F0F0] tracking-tight">
                  RAPID COLD EXTRACTION <span className="text-[#FF4D00]">STABLE</span>
                </div>
              </div>

              {/* Specs dials row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                <div className="bg-[#111]/60 border border-[#222] p-4 rounded-md">
                  <div className="text-[9px] text-[#888] uppercase tracking-[2px] font-bold mb-2 flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-[#FF4D00]" /> TEMP
                  </div>
                  <div className="text-lg sm:text-xl font-mono font-black text-[#F0F0F0]">{metrics.temp}</div>
                  <div className="text-[9px] text-green-500 font-mono mt-1 uppercase tracking-wider">▲ OPTIMAL</div>
                </div>
                <div className="bg-[#111]/60 border border-[#222] p-4 rounded-md">
                  <div className="text-[9px] text-[#888] uppercase tracking-[2px] font-bold mb-2 flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-[#E2FB45]" /> STEEP DENS
                  </div>
                  <div className="text-lg sm:text-xl font-mono font-black text-[#F0F0F0]">{metrics.tds}</div>
                  <div className="text-[9px] text-[#888] font-mono mt-1 uppercase tracking-wider">TDS TARGET</div>
                </div>
                <div className="bg-[#111]/60 border border-[#222] p-4 rounded-md">
                  <div className="text-[9px] text-[#888] uppercase tracking-[2px] font-bold mb-2 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8B5CF6]" /> DURATION
                  </div>
                  <div className="text-lg sm:text-xl font-mono font-black text-[#F0F0F0]">{metrics.duration}</div>
                  <div className="text-[9px] text-[#666] font-mono mt-1 uppercase tracking-wider">OF 18.0 H</div>
                </div>
              </div>
            </div>

            {/* Down Countdown and call action */}
            <div className="border-t border-[#1F1F1F] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] text-[#888] uppercase tracking-[2px] font-bold mb-1">NEXT RE-BREW CYCLE COOLDOWN</div>
                <div className="text-2xl font-mono font-black text-[#E2FB45] flex items-center gap-2">
                  <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span className="animate-pulse">:</span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span className="animate-pulse">:</span>
                  <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4D00]/5 text-[#FF4D00] border border-[#FF4D00]/20 rounded-full text-[10px] tracking-widest uppercase font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> Volatiles Sealed today
              </div>
            </div>
          </div>

          {/* Interactive protocol stages - Right Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isSelected = activeStep === index;
              return (
                <div 
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`border p-5 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden flex items-start gap-4 ${
                    isSelected 
                      ? 'bg-[#151515] border-[#FF4D00] shadow-[0_0_15px_rgba(255,77,0,0.06)]' 
                      : 'bg-[#0A0A0A] border-[#222] hover:border-[#3a3a3a]'
                  }`}
                >
                  <div className={`p-3 rounded-md ${isSelected ? 'bg-[#FF4D00] text-black' : 'bg-[#151515] text-[#888]'}`}>
                    <Icon className="w-5 h-5 pointer-events-none" />
                  </div>
                  <div className="flex-1 pointer-events-none">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF4D00] uppercase">{step.hours}</span>
                      <span className="text-[9px] font-mono text-[#666] uppercase">{step.metric}</span>
                    </div>
                    <h3 className={`text-base font-black tracking-tight uppercase ${isSelected ? 'text-[#F0F0F0]' : 'text-[#888]'}`}>{step.title}</h3>
                    {isSelected && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-[#888] leading-relaxed mt-2"
                      >
                        {step.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* The Freshness Comparison Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#070707] border border-[#222] p-8 sm:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E2FB45]/5 rounded-bl-full pointer-events-none" />
          
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#F0F0F0] tracking-tight mb-4">
              WHY THE <span className="text-[#E2FB45]">24-HOUR RULE</span> MATTERS
            </h3>
            <p className="text-sm text-[#888] leading-relaxed mb-6">
              Unlike normal coffees that sit in depots for months losing flavor complex compounds, cold brew is dynamic. After canning, nitrogen protects it, but the extraction freshness peaks immediately. We refuse to deliver stale, flat inventory.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-[#888]">
                <span className="text-[#FF4D00] mt-0.5 font-bold">✓</span>
                <span><strong>No Oxygen Stale:</strong> Sealed within milliseconds to preserve full aromatic peak.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#888]">
                <span className="text-[#FF4D00] mt-0.5 font-bold">✓</span>
                <span><strong>Pure Cold-Press Core:</strong> Zero artificial preservatives, sugars, or heavy pasteurization.</span>
              </li>
            </ul>
          </div>

          {/* Bar Visualizer */}
          <div className="bg-[#111] border border-[#2A2A2A] p-6 rounded-xl space-y-6">
            <div className="text-[10px] text-[#888] uppercase tracking-[3px] font-black">VOLATILE FLAVOR RETENTION (%)</div>
            
            {/* Brew & Can Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#FF4D00]">BREW & CAN COLD BREW (DELIVERED &lt;24H)</span>
                <span className="text-[#F0F0F0] font-mono">98.5% PEAK</span>
              </div>
              <div className="h-4 bg-[#222] rounded-sm overflow-hidden flex">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '98.5%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-gradient-to-r from-[#FF4D00] to-[#E2FB45]" 
                />
              </div>
              <p className="text-[10px] text-[#666] uppercase">Vibrant complex acidity, thick velvety body, loud aromas.</p>
            </div>

            {/* Standard Store Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#666]">
                <span>COMMERCIAL BRANDS (STORE SHELF 3-6 MONTHS)</span>
                <span className="text-[#888] font-mono">14.0%</span>
              </div>
              <div className="h-4 bg-[#222] rounded-sm overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '14%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="bg-[#444] h-full" 
                />
              </div>
              <p className="text-[10px] text-[#666] uppercase">Oxidized tones, flat woody notes, requires added sugar/milk to taste presentable.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
