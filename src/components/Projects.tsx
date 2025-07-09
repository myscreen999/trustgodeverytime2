import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';

interface ProjectsData {
  title: string;
  description: string;
  projectsList: Array<{
    title: string;
    image: string;
  }>;
}

const Projects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const projectsData = useContent<ProjectsData>('/src/data/projects.json');

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
  const defaultProjects = [
    {
      title: 'Projet de construction moderne',
      image: 'https://i.postimg.cc/Y25wJYhB/62fc8b03-29dc-443c-be5f-1170b94fc960.jpg',
    },
    {
      title: 'Infrastructure routière',
      image: 'https://i.postimg.cc/5yvDxK6d/deba58d9-da5f-4f0f-87c2-448db6d3ecee.jpg',
    },
    {
      title: 'Développement urbain',
      image: 'https://i.postimg.cc/7hgQvCWq/5937acb7-17a5-4904-90fb-2c96f91192db.jpg',
    }
  ];

  const title = projectsData?.title || 'Nos Réalisations';
  const description = projectsData?.description || 'Notre portfolio comprend des chantiers emblématiques...';
  const projects = projectsData?.projectsList || defaultProjects;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev === null ? 0 : (prev + 1) % projects.length));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === null ? 0 : (prev - 1 + projects.length) % projects.length));
  };

  return (
    <section 
      id="realisations" 
      ref={sectionRef}
      className={`py-20 bg-white ${
        sectionVisible ? 'animate-tilt3d-projects' : 'section-3d-initial'
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-slideUp"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => openLightbox(index)}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-lg">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="relative max-w-4xl max-h-full p-4">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-blue-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              
              <img 
                src={projects[selectedImage].image} 
                alt={projects[selectedImage].title}
                className="w-full h-auto max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <h3 className="text-xl font-semibold">{projects[selectedImage].title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;