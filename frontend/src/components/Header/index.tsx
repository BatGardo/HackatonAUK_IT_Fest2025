import { type FC, useState, useEffect } from 'react';
import Logo from '../Logo';
import { Button } from '../base/buttons/button';
import PopUp from '../PopUp';
import { SocialButton } from '../base/buttons/social-button';
import authAPI from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/i18n';

interface HeaderProps {
    hasTryOutButton?: boolean;
}

const Header: FC<HeaderProps> = ({ hasTryOutButton = true }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'UA' | 'ENG'>('ENG');
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'UA' | 'ENG' | null;
    if (savedLanguage && (savedLanguage === 'UA' || savedLanguage === 'ENG')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleSeeProfile = () => {
    navigate('/profile');
  };

  const handleLanguageChange = (language: 'UA' | 'ENG') => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    
    // Change i18n language immediately
    const i18nLanguage = language === 'UA' ? 'ua' : 'en';
    i18n.changeLanguage(i18nLanguage);
  };

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl shadow-sm bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Desktop layout - single row */}
          <div className="hidden sm:flex justify-between items-center">
            <Logo />
            
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange('ENG')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    currentLanguage === 'ENG'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ENG
                </button>
                <button
                  onClick={() => handleLanguageChange('UA')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    currentLanguage === 'UA'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  UA
                </button>
              </div>
              
              {/* Main Action Button */}
              {hasTryOutButton ? (
                <Button
                  color="primary"
                  size="xl"
                  onClick={() => setIsPopupOpen(true)}
                >
                  {t('Try Out Now')}
                </Button>
              ) : (
                <Button
                  color="primary"
                  size="xl"
                  onClick={handleSeeProfile}
                >
                  {t('See Profile')}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile layout - stacked */}
          <div className="sm:hidden">
            {/* Top row - Logo and Language Toggle */}
            <div className="flex justify-between items-center mb-3">
              <Logo />
              
              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange('ENG')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    currentLanguage === 'ENG'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ENG
                </button>
                <button
                  onClick={() => handleLanguageChange('UA')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    currentLanguage === 'UA'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  UA
                </button>
              </div>
            </div>

            {/* Bottom row - Action Button */}
            <div className="flex justify-center">
              {hasTryOutButton ? (
                <Button
                  color="primary"
                  size="lg"
                  onClick={() => setIsPopupOpen(true)}
                  className="w-full sm:w-auto"
                >
                  {t('Try Out Now')}
                </Button>
              ) : (
                <Button
                  color="primary"
                  size="lg"
                  onClick={handleSeeProfile}
                  className="w-full sm:w-auto"
                >
                  {t('See Profile')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <PopUp
          title={t('Welcome to HireMind!')}
          subtitle={t('Sign in to boost your career!')}
          content={
            <SocialButton social="google" theme="brand" onClick={() => {
              void authAPI.loginWithGoogle();
            }}>
              {t('Sign in with Google')}
            </SocialButton>
          }
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default Header; 