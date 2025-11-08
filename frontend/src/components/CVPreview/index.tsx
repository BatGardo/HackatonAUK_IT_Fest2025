import type { CVData } from "@/pages/CVBuilderPage";
import { Button } from "../base/buttons/button";
import { useTranslation } from "react-i18next";

export type CVTemplate = 'modern' | 'classic';

interface CVPreviewProps {
  cvData: CVData;
  onDownloadPDF: () => void;
  template?: CVTemplate;
  userName?: string;
  userEmail?: string;
  ref: React.Ref<HTMLDivElement>;
}

export const CVPreview = ({ cvData, onDownloadPDF, template = 'modern', userName = 'John Doe', userEmail = 'john.doe@example.com', ref }: CVPreviewProps) => {
    const { t } = useTranslation();
  const hasAnyData = () => {
    return cvData.aboutMe || 
           cvData.professionalTitle ||
           cvData.education.length > 0 || 
           cvData.experience.length > 0 || 
           cvData.skills.length > 0;
  };

  const renderModernTemplate = () => (
    <div className="bg-white border border-gray-200 shadow-sm" ref={ref}>
      {/* CV Header */}
      <div className="bg-slate-800 text-white p-6">
        <h1 className="text-2xl font-bold text-center mb-2">{userName}</h1>
        <p className="text-center text-slate-300 mb-1">
          {cvData.professionalTitle || 'Professional Title'}
        </p>
        <p className="text-center text-slate-400 text-sm">
          {userEmail}
        </p>
      </div>

      {/* CV Body */}
      <div className="p-6 space-y-6">
        {/* About Me Section */}
        {cvData.aboutMe && (
          <div className='text-left'>
            <h2 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-200">{t('PROFILE')}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{cvData.aboutMe}</p>
          </div>
        )}

        {/* Education Section */}
        {cvData.education.length > 0 && (
          <div className='text-left'>
            <h2 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-200">{t('EDUCATION')}</h2>
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
            <h2 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-200">{t('EXPERIENCE')}</h2>
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
            <h2 className="text-lg font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-200">{t('SKILLS')}</h2>
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
  );

  const renderClassicTemplate = () => (
    <div className="bg-white border-2 border-gray-800 shadow-sm" ref={ref}>
      {/* CV Header */}
      <div className="border-b-4 border-gray-800 p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">{userName?.toUpperCase()}</h1>
        <p className="text-center text-gray-600 font-medium uppercase tracking-wider mb-1">
          {cvData.professionalTitle || 'Professional Title'}
        </p>
        <p className="text-center text-gray-500 text-sm">
          {userEmail}
        </p>
      </div>

      {/* CV Body */}
      <div className="p-6">
        {/* About Me Section */}
        {cvData.aboutMe && (
          <div className='text-left mb-6'>
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">{t('Professional summary')}</h2>
            <p className="text-sm text-gray-700 leading-relaxed border-l-4 border-gray-800 pl-4">{cvData.aboutMe}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Experience Section */}
          {cvData.experience.length > 0 && (
            <div className='text-left'>
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">{t('Professional experience')}</h2>
              <div className="space-y-5">
                {cvData.experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-gray-400 pl-4">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {exp.position || 'Position'}
                      </h3>
                      <p className="text-base font-semibold text-gray-600">{exp.company || 'Company'}</p>
                      <p className="text-sm text-gray-500 italic">
                        {exp.startDate && (exp.endDate || exp.current) ? 
                          `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` : 
                          exp.startDate || ''}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {cvData.education.length > 0 && (
            <div className='text-left'>
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">{t('Education')}</h2>
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-gray-400 pl-4">
                    <h3 className="text-base font-bold text-gray-800">
                      {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm font-semibold text-gray-600">{edu.institution || 'Institution'}</p>
                    <p className="text-sm text-gray-500 italic">
                      {edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : 
                       edu.startYear ? `${edu.startYear} - Present` : ''}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-gray-700 leading-relaxed mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {cvData.skills.length > 0 && (
            <div className='text-left'>
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">{t('Skills')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvData.skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-gray-800">{skill.name || 'Skill'}</span>
                      <span className="text-xs text-gray-600 font-medium">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-800 h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${(['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(skill.level) + 1) * 25}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 h-fit sticky top-8">
      {/* Desktop layout - title and button side by side */}
      <div className="hidden sm:flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('CV Preview')}</h2>
        <div className="flex gap-2">
            <Button onClick={onDownloadPDF} size="md" color='primary-destructive' className='mb-4'>{t('Download PDF')}</Button>
        </div>
      </div>

      {/* Mobile layout - title and button stacked */}
      <div className="sm:hidden mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{t('CV Preview')}</h2>
        <div className="flex justify-center">
            <Button onClick={onDownloadPDF} size="md" color='primary-destructive'>{t('Download PDF')}</Button>
        </div>
      </div>
      
      {!hasAnyData() ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">{t('Professional CV Template')}</h3>
          <p className="text-gray-500">{t('Fill out the form to see your professional CV here')}</p>
        </div>
      ) : (
        template === 'modern' ? renderModernTemplate() : renderClassicTemplate()
      )}
    </div>
  );
};