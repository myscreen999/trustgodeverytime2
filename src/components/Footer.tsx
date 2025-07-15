import React from 'react';
import { Phone, Smartphone, MessageCircle, Mail } from 'lucide-react';
import { useContent } from '../hooks/useContent';

interface FooterData {
  description: string;
  copyright: string;
}

interface SiteData {
  logo: string;
}

interface ContactData {
  phone: string;
  mobile: string;
  whatsapp: string;
}

const Footer: React.FC = () => {
  const footerData = useContent<FooterData>('footer.json');
  const siteData = useContent<SiteData>('site.json');
  const contactData = useContent<ContactData>('contact.json');

  // Fallback data
  const logo = siteData?.logo || 'https://i.postimg.cc/x8zq9Qvf/2025-06-29-T075316-796.png';
  const description = footerData?.description || 'Construire l\'Afrique de demain, aujourd\'hui...';
  const copyright = footerData?.copyright || '© 2025 ON AFRICA TP. Tous droits réservés.';
  const phone = contactData?.phone || '+222 25901252';
  const mobile = contactData?.mobile || '+222 28880729';
  const whatsapp = contactData?.whatsapp || '+222 666 39 63 36';

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img 
              src={logo} 
              alt="ON AFRICA TP" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">{mobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">{whatsapp}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Construction de bâtiments</li>
              <li>Terrassement et voirie</li>
              <li>Aménagements agricoles</li>
              <li>Adduction d'eau potable</li>
              <li>Logistique et transport</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;