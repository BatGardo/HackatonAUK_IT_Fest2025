import type { CVData } from "@/pages/CVBuilderPage";

interface CVPreviewProps {
  cvData: CVData;
  onDownloadPDF: () => void;
  ref: React.Ref<HTMLDivElement>;
}

export const CVPreview = ({ cvData, onDownloadPDF, ref }: CVPreviewProps) => {
  const hasAnyData = () => {
    return cvData.aboutMe || 
           cvData.professionalTitle ||
           cvData.education.length > 0 || 
           cvData.experience.length > 0 || 
           cvData.skills.length > 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 h-fit sticky top-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">CV Preview</h2>
        <button
          onClick={onDownloadPDF}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
        >
          Download PDF
        </button>
      </div>
      
      {!hasAnyData() ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Professional CV Template</h3>
          <p className="text-gray-500">Fill out the form to see your professional CV here</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 shadow-sm" ref={ref}>
          {/* CV Header */}
          <div className="bg-slate-800 text-white p-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-gray-600">👤</span>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">John Doe</h1>
            <p className="text-center text-slate-300">
              {cvData.professionalTitle || 'Professional Title'}
            </p>
          </div>

          {/* CV Body */}
          <div className="p-6 space-y-6">
            {/* About Me Section */}
            {cvData.aboutMe && (
              <div className='text-left'>
                <h2 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-200">PROFILE</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{cvData.aboutMe}</p>
              </div>
            )}

            {/* Education Section */}
            {cvData.education.length > 0 && (
              <div className='text-left'>
                <h2 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-200">EDUCATION</h2>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm text-slate-800">
                          {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                        </h3>
                        <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : 
                           edu.startYear ? `${edu.startYear} - Present` : ''}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 mb-1">{edu.institution || 'Institution'}</p>
                      {edu.description && (
                        <p className="text-xs text-slate-600 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {cvData.experience.length > 0 && (
              <div className='text-left'>
                <h2 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-200">EXPERIENCE</h2>
                <div className="space-y-4">
                  {cvData.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm text-slate-800">
                          {exp.position || 'Position'}
                        </h3>
                        <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {exp.startDate && (exp.endDate || exp.current) ? 
                            `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` : 
                            exp.startDate || ''}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 mb-1">{exp.company || 'Company'}</p>
                      {exp.description && (
                        <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {cvData.skills.length > 0 && (
              <div className='text-left'>
                <h2 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-200">SKILLS</h2>
                <div className="grid grid-cols-2 gap-3">
                  {cvData.skills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-800">{skill.name || 'Skill'}</span>
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(skill.level) + 1)
                                ? 'bg-slate-800'
                                : 'bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};