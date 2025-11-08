import { type FC, useState } from 'react';
import Logo from '../Logo';
import { Button } from '../base/buttons/button';
import PopUp from '../PopUp';
import { SocialButton } from '../base/buttons/social-button';
import authAPI from '@/api/auth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    hasTryOutButton?: boolean;
}

const Header: FC<HeaderProps> = ({ hasTryOutButton = true }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleSeeProfile = () => {
    navigate('/profile');
  };

  return (
    <>
      <div className="w-full px-6 lg:px-8 py-4 rounded-xl shadow-sm bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          {hasTryOutButton ? (
            <Button
              color="primary"
              size="xl"
              onClick={() => setIsPopupOpen(true)}
            >
              Try Out
            </Button>
          ) : (
            <Button
              color="primary"
              size="xl"
              onClick={handleSeeProfile}
            >
              See Profile
            </Button>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <PopUp
          title="Welcome to HireMind!"
          subtitle="Sign in to boost your career!"
          content={
            <SocialButton social="google" theme="brand" onClick={() => {
              void authAPI.loginWithGoogle();
            }}>
              Sign in with Google
            </SocialButton>
          }
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default Header; 