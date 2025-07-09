import React, { useState, useEffect, useRef } from 'react';

const Partners: React.FC = () => {
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

  const partners = [
    {
      id: 1,
      name: 'Partenaire 1',
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119-b01a-44e8-8078-ca0b1a7e48c2.jpg'
    },
    {
      id: 2,
      name: 'Partenaire 2',
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119-b01a-44e8-8078-ca0b1a7e48c2.jpg'
    },
    {
      id: 3,
      name: 'Partenaire 3',
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119-b01a-44e8-8078-ca0b1a7e48c2.jpg'
    },
    {
      id: 4,
      name: 'Partenaire 4',
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119-b01a-44e8-8078-ca0b1a7e48c2.jpg'
    }
  ];

  return (
    <section 
      id="partenaires" 
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-slate-50 to-white ${
        sectionVisible ? 'animate-tilt3d-partners' : 'section-3d-initial'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slideUp">
            Nos Partenaires
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fadeIn">
            ON AFRICA TP s'appuie sur un réseau de partenaires nationaux et internationaux solides pour mener à bien ses projets. Ensemble, nous partageons des valeurs de transparence, de performance et de croissance mutuelle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative group">
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-center mt-4 font-semibold text-gray-900">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;