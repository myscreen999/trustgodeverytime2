import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';

const PasswordSetup: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [netlifyIdentityLoaded, setNetlifyIdentityLoaded] = useState(false);

  useEffect(() => {
    // Check if Netlify Identity is already loaded
    if (window.netlifyIdentity) {
      setNetlifyIdentityLoaded(true);
      window.netlifyIdentity.init();
    } else {
      // Wait for it to load
      const checkIdentity = setInterval(() => {
        if (window.netlifyIdentity) {
          setNetlifyIdentityLoaded(true);
          window.netlifyIdentity.init();
          clearInterval(checkIdentity);
        }
      }, 100);
      
      // Cleanup after 10 seconds
      setTimeout(() => clearInterval(checkIdentity), 10000);
    }
  }, []);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!/(?=.*[a-z])/.test(pwd)) return 'Le mot de passe doit contenir au moins une lettre minuscule';
    if (!/(?=.*[A-Z])/.test(pwd)) return 'Le mot de passe doit contenir au moins une lettre majuscule';
    if (!/(?=.*\d)/.test(pwd)) return 'Le mot de passe doit contenir au moins un chiffre';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    try {
      // Get the recovery token from URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('recovery_token') || urlParams.get('confirmation_token');

      if (!token) {
        throw new Error('Token de récupération manquant. Veuillez utiliser le lien reçu par email.');
      }

      if (!netlifyIdentityLoaded || !window.netlifyIdentity) {
        throw new Error('Service d\'authentification non disponible. Veuillez réessayer.');
      }

      // Use Netlify Identity to complete the password setup
      const user = await window.netlifyIdentity.confirm(token, true);
      
      if (user) {
        setSuccess(true);
        setTimeout(() => {
          // Redirect to admin panel
          window.location.href = '/admin';
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la configuration du mot de passe');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(pwd)) strength++;
    if (/(?=.*[A-Z])/.test(pwd)) strength++;
    if (/(?=.*\d)/.test(pwd)) strength++;
    if (/(?=.*[@$!%*?&])/.test(pwd)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return 'Faible';
    if (strength < 4) return 'Moyen';
    return 'Fort';
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Mot de passe configuré avec succès !
          </h1>
          <p className="text-gray-600 mb-6">
            Vous allez être redirigé vers le panneau d'administration dans quelques secondes...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Configuration du mot de passe
          </h1>
          <p className="text-gray-600">
            Créez un mot de passe sécurisé pour accéder au panneau d'administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Entrez votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(getPasswordStrength(password))}`}
                      style={{ width: `${(getPasswordStrength(password) / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">
                    {getStrengthText(getPasswordStrength(password))}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Confirmez votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Exigences du mot de passe :</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li className={password.length >= 8 ? 'text-green-600' : ''}>
                • Au moins 8 caractères
              </li>
              <li className={/(?=.*[a-z])/.test(password) ? 'text-green-600' : ''}>
                • Une lettre minuscule
              </li>
              <li className={/(?=.*[A-Z])/.test(password) ? 'text-green-600' : ''}>
                • Une lettre majuscule
              </li>
              <li className={/(?=.*\d)/.test(password) ? 'text-green-600' : ''}>
                • Un chiffre
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password || !confirmPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Configuration en cours...
              </>
            ) : (
              'Configurer le mot de passe'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Extend window object for TypeScript
declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export default PasswordSetup;