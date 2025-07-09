import React, { useState, useEffect, useRef } from 'react';
import { Building, Truck, Wrench, Droplets, Package, Car, Plus } from 'lucide-react';

const Services: React.FC = () => {
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

  const services = [
    {
      icon: Building,
      title: 'Construction de bâtiments',
      image: 'https://i.postimg.cc/QCPvsGXq/c981b834-9f70-42e7-89a1-b3782ac32dd0.jpg'
    },
    {
      icon: Truck,
      title: 'Terrassement et voirie',
      image: 'https://i.postimg.cc/Rh3bgscJ/05cc3b44-ddaf-4ce0-8807-13ba8aec1c0d.jpg'
    },
    {
      icon: Wrench,
      title: 'Aménagements agricoles',
      image: 'https://i.postimg.cc/0y1HCCrr/6f1f99f5-afd3-4dfc-ac3f-1f5020092a4d.jpg'
    },
    {
      icon: Droplets,
      title: 'Adduction d\'eau potable',
      image: 'https://i.postimg.cc/QCPvsGXq/c981b834-9f70-42e7-89a1-b3782ac32dd0.jpg'
    },
    {
      icon: Package,
      title: 'Logistique et transport',
      image: 'https://i.postimg.cc/Rh3bgscJ/05cc3b44-ddaf-4ce0-8807-13ba8aec1c0d.jpg'
    },
    {
      icon: Car,
      title: 'Location de camions et engins lourds',
      image: 'https://i.postimg.cc/0y1HCCrr/6f1f99f5-afd3-4dfc-ac3f-1f5020092a4d.jpg'
    },
    {
      icon: Plus,
      title: 'Autres services',
      image: 'https://i.postimg.cc/QCPvsGXq/c981b834-9f70-42e7-89a1-b3782ac32dd0.jpg'
    }
  ];

  const values = [
    {
      title: 'Mission',
      description: 'Fournir des solutions fiables et innovantes qui répondent aux besoins croissants des infrastructures africaines.',
      icon: '🎯'
    },
    {
      title: 'Vision',
      description: 'Devenir un leader incontesté du BTP en Afrique en alliant excellence technique et approche durable.',
      icon: '👁️'
    },
    {
      title: 'Valeurs',
      description: 'Professionnalisme – Intégrité – Sécurité – Innovation – Impact social',
      icon: '💎'
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-white to-slate-50 ${
        sectionVisible ? 'animate-tilt3d-services' : 'section-3d-initial'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slideUp">
            Nos Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fadeIn">
            Nos services couvrent l'ensemble du cycle de vie des projets de construction et d'infrastructure. Grâce à une équipe expérimentée et des outils de pointe, nous offrons des solutions adaptées à chaque contexte local, en respectant les délais, les budgets et les normes les plus exigeantes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 text-white">
                    <service.icon className="w-6 h-6" />
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slideUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;