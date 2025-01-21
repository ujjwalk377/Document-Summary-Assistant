import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyAOUDRPQBJf4UviHVeYQ_w-lWaJZPvA9yA");

const getSummaryPrompt = (text, length) => {
  const lengthMap = {
    short: 'Provide a concise summary in about 2-3 sentences.',
    medium: 'Provide a detailed summary in about 4-5 sentences.',
    long: 'Provide a comprehensive summary in about 6-8 sentences.'
  };

  return `
    Please analyze the following text and:
    1. Generate a summary (${lengthMap[length]})
    2. Extract 3-5 key points
    3. Identify 2-3 main ideas

    Text to analyze:
    ${text}
  `;
};

export const generateSummary = async (text, length = 'medium') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = getSummaryPrompt(text, length);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    // Parse the response to extract different parts
    const parts = textResponse.split('\n\n');
    
    return {
      fullSummary: parts[0].replace('Summary:', '').trim(),
      keyPoints: parts[1].replace('Key Points:', '')
        .split('\n')
        .filter(point => point.trim())
        .map(point => point.replace(/^[•-]\s*/, '')),
      mainIdeas: parts[2].replace('Main Ideas:', '')
        .split('\n')
        .filter(idea => idea.trim())
        .map(idea => idea.replace(/^[•-]\s*/, ''))
    };

  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary');
  }
};