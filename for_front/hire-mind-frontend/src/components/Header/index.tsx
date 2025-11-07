import { type FC, useState } from 'react';
import Logo from '../Logo';
import { Button } from '../base/buttons/button';
import PopUp from '../PopUp';
import { SocialButton } from '../base/buttons/social-button';

interface HeaderProps {
    hasTryOutButton?: boolean;
}

const Header: FC<HeaderProps> = ({ hasTryOutButton = true }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className="w-full px-6 lg:px-8 py-4 rounded-xl shadow-sm bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          {hasTryOutButton && (
            <Button
              color="primary"
              size="xl"
              onClick={() => setIsPopupOpen(true)}
            >
              Try Out
            </Button>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <PopUp
          title="Welcome to HireMind!"
          subtitle="Sign in to boost your career!"
          content={
            <SocialButton social="google" theme="brand">
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