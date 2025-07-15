import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../hooks/useContent';

interface PartnersData {
  title: string;
  description: string;
  partnersList: Array<{
    name: string;
    image: string;
  }>;
}

const Partners: React.FC = () => {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const partnersData = useContent<PartnersData>('partners.json');

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

  // Fallback data
  const defaultPartners = [
    {
      name: 'Partenaire 1',
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119-b01a-44e8-8078-ca0b1a7e48c2.jpg'
    },
    {
      name: 'Partenaire 2',
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119-b01a-44e8-8078-ca0b1a7e48c2.jpg'
    },
    {
      name: 'Partenaire 3',
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119-b01a-44e8-8078-ca0b1a7e48c2.jpg'
    },
    {
      name: 'Partenaire 4',
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119-b01a-44e8-8078-ca0b1a7e48c2.jpg'
    }
  ];

  const title = partnersData?.title || 'Nos Partenaires';
  const description = partnersData?.description || 'ON AFRICA TP s\'appuie sur un réseau de partenaires...';
  const partners = partnersData?.partnersList || defaultPartners;

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
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fadeIn">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
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