import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionVisible) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionVisible]);

  const stats = [
    { number: 15, suffix: '+', label: 'ans d\'expérience' },
    { number: 120, suffix: '+', label: 'projets réalisés' },
    { number: 40, suffix: '+', label: 'partenaires' },
    { number: 200, suffix: '+', label: 'employés actifs' }
  ];

  const Counter = ({ number, suffix, label }: { number: number; suffix: string; label: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (statsVisible) {
        const timer = setInterval(() => {
          setCount(prev => {
            if (prev < number) {
              return prev + Math.ceil(number / 50);
            }
            return number;
          });
        }, 50);
        return () => clearInterval(timer);
      }
    }, [statsVisible, number]);

    return (
      <div className="text-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2">
          {count}{suffix}
        </div>
        <div className="text-blue-100 text-sm md:text-base">
          {label}
        </div>
      </div>
    );
  };

  return (
    <section 
      id="accueil" 
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        sectionVisible ? 'animate-tilt3d-hero' : 'section-3d-initial'
      }`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://i.postimg.cc/wMfgmG9t/Whats-App-Image-2025-06-28-at-23-35-43.jpg)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slideUp">
          Construire l'Afrique de demain,{' '}
          <span className="text-blue-300">aujourd'hui.</span>
        </h1>
        
        <button 
          onClick={() => document.getElementById('presentation')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fadeIn"
        >
          Découvrir notre mission
          <ChevronDown className="w-5 h-5" />
        </button>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="animate-slideUp" style={{ animationDelay: `${index * 0.2}s` }}>
              <Counter {...stat} />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-16 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed animate-fadeIn">
            Depuis sa création, ON AFRICA TP s'engage à transformer l'infrastructure africaine grâce à une combinaison unique de savoir-faire technique, d'innovation constante et de vision à long terme. Notre présence dans plusieurs régions du continent témoigne de notre capacité à mener à bien des projets d'envergure avec rigueur et professionnalisme.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

export default Hero;