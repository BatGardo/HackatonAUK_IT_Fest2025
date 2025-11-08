import { Button } from '@/components/base/buttons/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Tell me about yourself and your professional background.",
  },
  {
    id: 2,
    text: "What are your greatest strengths and how do they apply to this role?",
  },
  {
    id: 3,
    text: "Describe a challenging project you worked on and how you overcame the obstacles.",
  },
  {
    id: 4,
    text: "Where do you see yourself in 5 years?",
  },
  {
    id: 5,
    text: "Why are you interested in working for our company?",
  },
  {
    id: 6,
    text: "Describe a time when you had to work with a difficult team member.",
  },
  {
    id: 7,
    text: "What is your greatest weakness and how are you working to improve it?",
  },
  {
    id: 8,
    text: "Do you have any questions for us about the role or company?",
  }
];

export const InterviewPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === SAMPLE_QUESTIONS.length - 1;
  const progress = ((currentQuestionIndex + 1) / SAMPLE_QUESTIONS.length) * 100;

  const handleBackToDashboard = () => {
    navigate('/dashboard');
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

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generateFeedback = (answerText: string) => {
        const wordCount = answerText.trim().split(/\s+/).length;
        if (wordCount < 10) {
          return "Consider providing more detail in your answer. Employers typically appreciate comprehensive responses that showcase your experience and thought process.";
        } else if (wordCount > 100) {
          return "Your answer is quite detailed, which is good! Just make sure to stay concise and focused on the key points during an actual interview.";
        } else {
          return "Great answer! You've provided a good level of detail while staying focused. This demonstrates clear communication skills.";
        }
      };

      setFeedback(generateFeedback(answer));
      setShowFeedback(true);
    } catch (error) {
      console.error('Error checking answer:', error);
      setFeedback('Unable to check answer at this time. Please try again.');
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
      setAnswer(answers[SAMPLE_QUESTIONS[currentQuestionIndex + 1]?.id] || '');
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAnswer(answers[SAMPLE_QUESTIONS[currentQuestionIndex - 1]?.id] || '');
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button onClick={handleBackToDashboard} size="md" color="secondary">
            &larr; Back to Dashboard
          </Button>

          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-800">Interview Practice</h1>
            <p className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {SAMPLE_QUESTIONS.length}
            </p>
          </div>

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
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Question Section */}
          <div className="mb-4">     
            <h2 className="text-2xl font-semibold text-gray-800 leading-relaxed">
              {currentQuestion.text}
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
                Tip: Aim for 50-150 words for a good response
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          {showFeedback && feedback && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Feedback</h3>
              <p className="text-blue-700">{feedback}</p>
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
              {SAMPLE_QUESTIONS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    setAnswer(answers[SAMPLE_QUESTIONS[index].id] || '');
                    setShowFeedback(false);
                    setFeedback(null);
                  }}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white'
                      : answers[SAMPLE_QUESTIONS[index].id]
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
        </div>
      </div>
    </div>
  );
};