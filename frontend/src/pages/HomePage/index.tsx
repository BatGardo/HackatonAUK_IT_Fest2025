import Header from "@/components/Header";
import PopUp from "@/components/PopUp";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const onTryOutClick = () => {
        navigate("/dashboard");
    };

  return (
    <>
    <div className="min-h-screen bg-white w-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="lg:pr-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Land Your Dream Job with 
                <span className="text-blue-600"> HireMind</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Prepare for your next career opportunity with our AI-powered platform. 
                Build professional CVs and practice interviews with intelligent feedback 
                to boost your confidence and success rate.
              </p>
              <div className="mt-10">
                <Button color="primary" size="lg" className="px-8 py-4" onClick={onTryOutClick}>
                  Try Out Now
                </Button>
              </div>
            </div>
            
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <p className="text-gray-500">Hero Image Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-gray-50 rounded-2xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our comprehensive platform provides the tools you need to stand out in today's competitive job market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* CV Builder Block */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">CV Builder</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Fill in your details, preview your CV and export it to PDF. Create professional, 
                ATS-friendly resumes that get noticed by employers.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                  Professional templates
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                  Real-time preview
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                  PDF export
                </li>
              </ul>
            </div>

            {/* Interview Practice Block */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🎤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Interview Practice</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Answer 5–8 timed questions and get a summary score with a checklist for improvement. 
                Build confidence with AI-powered feedback.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                  Timed practice sessions
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                  AI-powered scoring
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                  Improvement checklist
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Button 
              color="primary" 
              size="xl" 
              className="px-10 py-5 text-lg font-semibold"
                onClick={onTryOutClick}
            >
              Try Out Now
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Get started in less than 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-blue-900 text-white py-8 mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-blue-200">
              © 2025 HireMind. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
    {isPopupOpen && (
        <PopUp
          title="Welcome to HireMind!"
          subtitle="Sign in to boost your career!"
          content={
           <SocialButton
            social="google"
            theme="brand"
            onClick={() => {
              window.location.href = "https://hackatonauk-it-fest2025.onrender.com/auth/login";
            }}
          >
            Sign in with Google
          </SocialButton>

          }
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};