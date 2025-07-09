import React, { useState, useEffect, useRef } from 'react';

const Presentation: React.FC = () => {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section 
      id="presentation" 
      ref={sectionRef}
      className={`py-20 bg-white ${
        sectionVisible ? 'animate-tilt3d-presentation' : 'section-3d-initial'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slideLeft">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Présentation
            </h2>
            <p className="text-xl text-blue-800 font-semibold">
              Entreprise fondée en 2009, spécialisée dans le BTP, la logistique et les travaux publics.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Depuis plus de dix ans, ON AFRICA TP construit, connecte et aménage. Notre expertise va au-delà des simples chantiers : nous bâtissons des fondations pour le développement durable, tout en plaçant la qualité et la sécurité au cœur de nos préoccupations. Notre équipe multiculturelle partage des valeurs communes de rigueur, d'excellence et d'engagement.
            </p>
          </div>
          
          <div className="animate-slideRight">
            <div className="relative group">
              <img 
                src="https://i.postimg.cc/xjbwy8gx/b79e808c-d204-4333-8ad3-06938df561de.jpg" 
                alt="ON AFRICA TP Construction" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presentation;