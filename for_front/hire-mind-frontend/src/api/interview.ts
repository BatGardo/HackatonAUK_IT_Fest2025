import api from './axios';

export interface AIResponse {
  response: string;
}

export const interviewAPI = {
  generateQuestions: async (position: string) => {
    try {
        const prompt = `Generate a list of 5 common interview questions for a ${position} position. Return the questions as a list like this: ["Question 1", "Question 2", ...] without any other text.`;
        const response = await api.get<AIResponse>(`/ai/ask?prompt=${prompt}`);
        return response.data.response;
    } catch (error) {
        console.error('Failed to generate questions:', error);
    }
  },
  checkAnswer: async (question: string, answer: string) => {
    try {
        const prompt = `Evaluate the following answer to the question "${question}": "${answer}". Provide a brief feedback on the strengths and areas for improvement and score it from 1 to 10. Limit your response to 2-3 sentences focusing on key points only.`;
        const response = await api.get<AIResponse>(`/ai/ask?prompt=${prompt}`);
        console.log('Check Answer Response:', response.data);
        return response.data.response;
    } catch (error) {
        console.error('Failed to check answer:', error);
    }
  }
};

export const {
  generateQuestions,
  checkAnswer
} = interviewAPI;

export default interviewAPI;