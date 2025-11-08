import { Button } from '@/components/base/buttons/button';
import { generateQuestions, checkAnswer } from '@/api/interview';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
}

export const InterviewPage = () => {
  const navigate = useNavigate();
  
  // Position setup state
  const [position, setPosition] = useState('');
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showPositionForm, setShowPositionForm] = useState(true);
  
  // Interview state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleStartInterview = async () => {
    if (!position.trim()) {
      alert('Please enter a position title.');
      return;
    }

    setIsGeneratingQuestions(true);
    
    try {
      const generatedQuestions = await generateQuestions(position);
      
      // Parse the AI response to extract questions
      let questionList: string[] = [];
      try {
        // Try to parse as JSON array first
        questionList = JSON.parse(generatedQuestions || '[]');
      } catch {
        // If JSON parsing fails, try to extract questions from text
        const lines = generatedQuestions?.split('\n').filter((line: string) => line.trim()) || [];
        questionList = lines.map((line: string) => line.replace(/^\d+\.\s*/, '').replace(/^["']|["']$/g, '').trim());
      }

      // Convert to Question objects
      const formattedQuestions: Question[] = questionList.map((text, index) => ({
        id: index + 1,
        text: text
      }));

      if (formattedQuestions.length > 0) {
        setQuestions(formattedQuestions);
        setShowPositionForm(false);
        setCurrentQuestionIndex(0);
        setAnswer('');
        setAnswers({});
      } else {
        // Fallback to default questions if AI fails
        const defaultQuestions: Question[] = [
          { id: 1, text: `Tell me about yourself and your background relevant to the ${position} role.` },
          { id: 2, text: `What interests you most about this ${position} position?` },
          { id: 3, text: `What skills do you bring to this ${position} role?` },
          { id: 4, text: `Describe a challenging situation you've faced and how you handled it.` },
          { id: 5, text: `Where do you see yourself in 5 years in your ${position} career?` }
        ];
        setQuestions(defaultQuestions);
        setShowPositionForm(false);
      }
    } catch (error) {
      console.error('Failed to generate questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Helper function to format feedback text
  const formatFeedback = (text: string) => {
    // Convert **text** to <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const handleCheckAnswer = async () => {
    if (!answer.trim()) {
      alert('Please provide an answer before checking.');
      return;
    }

    setIsChecking(true);
    setShowFeedback(false);

    try {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }));

      // Use AI to check the answer
      const aiFeedback = await checkAnswer(currentQuestion.text, answer);
      setFeedback(aiFeedback || 'Great answer! Keep up the good work.');
      setShowFeedback(true);
    } catch (error) {
      console.error('Error checking answer:', error);
      // Fallback to simple feedback if AI fails
      const wordCount = answer.trim().split(/\s+/).length;
      let fallbackFeedback = '';
      if (wordCount < 10) {
        fallbackFeedback = "Consider providing more detail in your answer. Employers typically appreciate comprehensive responses that showcase your experience and thought process.";
      } else if (wordCount > 100) {
        fallbackFeedback = "Your answer is quite detailed, which is good! Just make sure to stay concise and focused on the key points during an actual interview.";
      } else {
        fallbackFeedback = "Great answer! You've provided a good level of detail while staying focused. This demonstrates clear communication skills.";
      }
      setFeedback(fallbackFeedback);
      setShowFeedback(true);
    } finally {
      setIsChecking(false);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      alert('Interview practice completed! Great job!');
      navigate('/dashboard');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer(answers[questions[currentQuestionIndex + 1]?.id] || '');
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAnswer(answers[questions[currentQuestionIndex - 1]?.id] || '');
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button onClick={handleBackToDashboard} size="md" color="secondary">
            Back to Dashboard
          </Button>

          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-800">Interview Practice</h1>
            {!showPositionForm && questions.length > 0 && (
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            )}
          </div>

          {!showPositionForm && questions.length > 0 && (
            <div className="w-32 text-right">
              <div className="text-sm text-gray-600 mb-1">Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {showPositionForm ? (
            /* Position Setup Form */
            <div className="text-center max-w-md mx-auto">
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 8.50224C10.1762 8.00136 10.524 7.579 10.9817 7.30998C11.4395 7.04095 11.9777 6.9426 12.501 7.03237C13.0243 7.12213 13.499 7.39421 13.8409 7.80041C14.1829 8.20661 14.37 8.72072 14.3692 9.25168C14.3692 10.7506 12.1209 11.5 12.1209 11.5M12.1499 14.5H12.1599M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z"
                        stroke={"#3B82F6"}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Your Interview Practice</h2>
                <p className="text-gray-600">Tell us the position you're applying for and we'll generate personalized interview questions for you.</p>
              </div>

              <div className="space-y-4">
                <div className="text-left">
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Position Title
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Software Engineer, Marketing Manager, Data Analyst..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isGeneratingQuestions}
                  />
                </div>
                
                <button
                  onClick={handleStartInterview}
                  disabled={!position.trim() || isGeneratingQuestions}
                  className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGeneratingQuestions ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating Questions...
                    </span>
                  ) : (
                    'Start Interview Practice'
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Interview Questions */
            <>
              {/* Question Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {position}
                  </span>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestionIndex + 1}
                  </span>
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-800 leading-relaxed">
                  {currentQuestion?.text}
                </h2>
              </div>

              {/* Answer Section */}
              <div className="mb-8">
                <label htmlFor="answer" className="block text-lg font-medium text-gray-700 mb-4">
                  Your Answer
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here... Take your time to think through your response."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 leading-relaxed"
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-500">
                    Word count: {answer.trim() ? answer.trim().split(/\s+/).length : 0}
                  </div>
                  <div className="text-sm text-gray-500">
                    Tip: Aim for 50-100 words for a good response
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              {showFeedback && feedback && (
                <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Feedback</h3>
                  <div 
                    className="text-blue-700"
                    dangerouslySetInnerHTML={{ __html: formatFeedback(feedback) }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  Previous
                </button>

                <div className="flex gap-4">
                  <button
                    onClick={handleCheckAnswer}
                    disabled={isChecking || !answer.trim()}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    {isChecking ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Checking...
                      </span>
                    ) : (
                      'Check Answer'
                    )}
                  </button>

                  {showFeedback && (
                    <button
                      onClick={handleNextQuestion}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                      {isLastQuestion ? 'Finish Interview' : 'Next Question'}
                    </button>
                  )}
                </div>
              </div>

              {/* Question Navigation */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentQuestionIndex(index);
                        setAnswer(answers[questions[index].id] || '');
                        setShowFeedback(false);
                        setFeedback(null);
                      }}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                        index === currentQuestionIndex
                          ? 'bg-blue-600 text-white'
                          : answers[questions[index].id]
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Click on a number to jump to that question
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};