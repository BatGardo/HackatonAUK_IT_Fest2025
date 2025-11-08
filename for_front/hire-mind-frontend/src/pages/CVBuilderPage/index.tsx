import { Button } from '@/components/base/buttons/button';
import { CVPreview, type CVTemplate } from '@/components/CVPreview';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";

declare global {
  interface Window {
    jsPDF: unknown;
  }
}

interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description: string;
}

interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface CVData {
  aboutMe: string;
  professionalTitle: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: Skill[];
}

export const CVBuilderPage = () => {
  const [cvData, setCvData] = useState<CVData>({
    aboutMe: '',
    professionalTitle: '',
    education: [],
    experience: [],
    skills: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>('modern');

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const navigate = useNavigate();

  const addEducation = () => {
    const newEducation: EducationEntry = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      description: ''
    };
    setCvData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
  };

  const updateEducation = (id: string, field: keyof EducationEntry, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addExperience = () => {
    const newExperience: ExperienceEntry = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setCvData(prev => ({ ...prev, experience: [...prev.experience, newExperience] }));
  };

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string | boolean) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Beginner'
    };
    setCvData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const handleSave = () => {
    console.log('Saving CV data:', cvData);
    alert('CV saved successfully!');
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className='w-full flex justify-start'>
          <Button onClick={goBack} size="lg" color='secondary' className='mb-4'>Back to Dashboard</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">CV Builder</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Choose Template</h2>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as CVTemplate)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="modern">Modern Template</option>
              <option value="classic">Classic Template</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">
              Select a template style for your CV. You can change this anytime and see the preview update instantly.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Professional Title</h2>
            <input
              type="text"
              value={cvData.professionalTitle}
              onChange={(e) => setCvData(prev => ({ ...prev, professionalTitle: e.target.value }))}
              placeholder="e.g. Software Developer, Marketing Manager, Data Scientist..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </section>
          
          {/* About Me Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">About Me</h2>
            <textarea
              value={cvData.aboutMe}
              onChange={(e) => setCvData(prev => ({ ...prev, aboutMe: e.target.value }))}
              placeholder="Write a brief description about yourself, your goals, and what makes you unique..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </section>

          {/* Education Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Education</h2>
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="sm:hidden">+</span>
                <span className="hidden sm:inline">Add Education</span>
              </button>
            </div>
            
            {cvData.education.map((education) => (
              <div key={education.id} className="bg-gray-50 p-6 rounded-lg mb-4 border">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Education Entry</h3>
                  <button
                    onClick={() => removeEducation(education.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Start Year"
                      value={education.startYear}
                      onChange={(e) => updateEducation(education.id, 'startYear', e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="End Year"
                      value={education.endYear}
                      onChange={(e) => updateEducation(education.id, 'endYear', e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <textarea
                  placeholder="Description (achievements, relevant coursework, etc.)"
                  value={education.description}
                  onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
            
            {cvData.education.length === 0 && (
              <p className="text-gray-500 text-center py-8">No education entries yet. Click "Add Education" to get started.</p>
            )}
          </section>

          {/* Experience Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Work Experience</h2>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span className="sm:hidden">+</span>
                <span className="hidden sm:inline">Add Experience</span>
              </button>
            </div>
            
            {cvData.experience.map((experience) => (
              <div key={experience.id} className="bg-gray-50 p-6 rounded-lg mb-4 border">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Experience Entry</h3>
                  <button
                    onClick={() => removeExperience(experience.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="month"
                    placeholder="Start Date"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="month"
                      placeholder="End Date"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                      disabled={experience.current}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed flex-1"
                    />
                    <label className="flex items-center gap-1 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={experience.current}
                        onChange={(e) => {
                          updateExperience(experience.id, 'current', e.target.checked);
                          if (e.target.checked) {
                            updateExperience(experience.id, 'endDate', '');
                          }
                        }}
                        className="rounded"
                      />
                      Current
                    </label>
                  </div>
                </div>
                
                <textarea
                  placeholder="Job description, responsibilities, achievements..."
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
            
            {cvData.experience.length === 0 && (
              <p className="text-gray-500 text-center py-8">No work experience entries yet. Click "Add Experience" to get started.</p>
            )}
          </section>

          {/* Skills Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Skills</h2>
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span className="sm:hidden">+</span>
                <span className="hidden sm:inline">Add Skill</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cvData.skills.map((skill) => (
                <div key={skill.id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Skill</h4>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              ))}
            </div>
            
            {cvData.skills.length === 0 && (
              <p className="text-gray-500 text-center py-8">No skills added yet. Click "Add Skill" to get started.</p>
            )}
          </section>

          {/* Save Buttons */}
          <div className="flex justify-center gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Save CV
            </button>
          </div>
          </div>

          {/* Professional CV Preview Panel */}
          <CVPreview cvData={cvData} onDownloadPDF={handlePrint} template={selectedTemplate} ref={printRef} />
        </div>
      </div>
    </div>
  );
};