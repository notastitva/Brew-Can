import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Pricing from './components/Pricing';
import SubscriptionModal from './components/SubscriptionModal';
import Products from './components/Products';
import FreshnessProtocol from './components/FreshnessProtocol';
import Story from './components/Story';
import FAQ from './components/FAQ';
import Marquee from './components/Marquee';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ManageArsenalModal from './components/ManageArsenalModal';
import Toast from './components/Toast';

export default function App() {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isManageArsenalOpen, setIsManageArsenalOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      
      if (window.location.hash !== '#story') {
        setTimeout(() => {
          const id = window.location.hash.replace('#', '');
          if (id && id !== 'home') {
            const element = document.getElementById(id);
            if (element) {
              const y = element.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isStoryPage = currentHash === '#story';

  return (
    <div className="min-h-screen font-sans selection:bg-[#FF4D00] selection:text-black bg-[#0A0A0A]">
      <Navbar onCartClick={() => setIsSubscriptionOpen(true)} onManageClick={() => setIsManageArsenalOpen(true)} />
      
      {isStoryPage ? (
        <Story />
      ) : (
        <div id="home">
          <Hero onSubscribeClick={() => setIsSubscriptionOpen(true)} />
          <Marquee />
          <FreshnessProtocol />
          <Products />
          <Testimonials />
          <Pricing onSubscribeClick={() => setIsSubscriptionOpen(true)} />
          <FAQ />
        </div>
      )}
      
      <SubscriptionModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />
      
      <CartDrawer />
      
      <ManageArsenalModal isOpen={isManageArsenalOpen} onClose={() => setIsManageArsenalOpen(false)} />
      
      <Toast />

      <Footer />
    </div>
  );
}
