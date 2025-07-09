import React, { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const DirectorMessage: React.FC = () => {
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
      id="directeur" 
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-slate-50 to-white ${
        sectionVisible ? 'animate-tilt3d-director' : 'section-3d-initial'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 animate-slideUp">
            Le mot du directeur
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideLeft">
              <div className="relative group">
                <img 
                  src="https://i.postimg.cc/HLwm2xp1/9d4f801b-36c6-452a-88f9-8a2d86c94d3c.jpg" 
                  alt="Directeur ON AFRICA TP" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
            
            <div className="space-y-6 animate-slideRight">
              <div className="relative">
                <Quote className="w-12 h-12 text-blue-600 mb-4" />
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  "Dans un monde en constante mutation, il est essentiel de disposer d'une vision claire et partagée. Chez ON AFRICA TP, nous croyons en une Afrique ambitieuse, autonome et prospère. Chaque projet que nous menons est une pierre apportée à cet édifice commun."
                </blockquote>
              </div>
              
              <div className="mt-8">
                <p className="text-gray-600 leading-relaxed">
                  Dans un monde en constante mutation, il est essentiel de disposer d'une vision claire et partagée. Chez ON AFRICA TP, nous croyons en une Afrique ambitieuse, autonome et prospère. Chaque projet que nous menons est une pierre apportée à cet édifice commun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorMessage;