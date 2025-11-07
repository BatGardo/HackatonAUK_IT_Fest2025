import Header from "@/components/Header";

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full">
        <Header hasTryOutButton={false} />
      </div>
      
      {/* Dashboard Content */}
      <section className="relative px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Welcome! Choose Your Path
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Select the tool you'd like to use to advance your career
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* CV Builder Container */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer group">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">📄</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">CV Builder</h3>
                <p className="text-gray-600 mb-6">
                  Create professional, ATS-friendly resumes that get noticed by employers. 
                  Fill in your details, preview your CV and export it to PDF.
                </p>
                <ul className="space-y-3 text-sm text-gray-600 mb-8">
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Professional templates
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Real-time preview
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    PDF export
                  </li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Start Building CV
                </button>
              </div>
            </div>

            {/* Interview Trainer Container */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200 hover:border-green-400 hover:shadow-xl transition-all cursor-pointer group">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">🎤</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interview Trainer</h3>
                <p className="text-gray-600 mb-6">
                  Practice interviews with AI-powered feedback. Answer 5–8 timed questions 
                  and get a summary score with improvement suggestions.
                </p>
                <ul className="space-y-3 text-sm text-gray-600 mb-8">
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Timed practice sessions
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    AI-powered scoring
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Improvement checklist
                  </li>
                </ul>
                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Start Interview Practice
                </button>
              </div>
            </div>
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
  );
};