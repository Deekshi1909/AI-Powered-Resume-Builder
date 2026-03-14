import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AI_API_KEY = process.env.AI_API_KEY;
const AI_API_BASE_URL = process.env.AI_API_BASE_URL || 'https://api.openai.com/v1';

const callOpenAI = async (prompt, maxTokens = 2000) => {
  try {
    const response = await axios.post(
      `${AI_API_BASE_URL}/chat/completions`,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert resume writer and career coach. Provide professional, concise, and impactful suggestions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Resume Builder'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI API Error:', error.message);
    throw new Error('Failed to call AI API: ' + error.message);
  }
};

const generateCustomizedResume = async (resumeData, jobDescription) => {
  const prompt = `
    You are a professional resume writer. Analyze the following job description and user's resume data, 
    then generate a customized resume summary and bullet points that best match the job requirements.
    
    Job Description:
    ${jobDescription}
    
    User Profile:
    Name: ${resumeData.personalInfo?.name || 'N/A'}
    Years of Experience: ${resumeData.experience?.length || 0}
    Skills: ${resumeData.skills?.map(s => s.name).join(', ') || 'N/A'}
    
    Please provide:
    1. A professional summary tailored to this job
    2. 3-4 customized bullet points for their most relevant experience
    3. Key skills to highlight (top 5-7)
    
    Format as JSON with keys: summary, bulletPoints (array), topSkills (array)
  `;

  try {
    const response = await callOpenAI(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error generating customized resume:', error);
    throw error;
  }
};

const extractJobKeywords = async (jobDescription) => {
  const prompt = `
    Analyze this job description and extract the most important keywords, skills, and requirements.
    
    Job Description:
    ${jobDescription}
    
    Return as JSON with keys: 
    - requiredSkills (array of strings)
    - preferredSkills (array of strings)
    - technicalKeywords (array of strings)
    - responsibilities (array of main responsibilities)
  `;

  try {
    const response = await callOpenAI(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error extracting keywords:', error);
    throw error;
  }
};

const improveBulletPoints = async (bulletPoint, jobDescription) => {
  const prompt = `
    Improve this resume bullet point to better match the job description using strong action verbs and quantifiable results.
    
    Original Bullet Point: "${bulletPoint}"
    
    Job Description: ${jobDescription}
    
    Return only the improved bullet point as a plain string, no JSON formatting.
  `;

  try {
    return await callOpenAI(prompt, 500);
  } catch (error) {
    console.error('Error improving bullet points:', error);
    throw error;
  }
};

const suggestMissingSkills = async (resumeSkills, jobDescription) => {
  const prompt = `
    Compare the user's skills with the job requirements and suggest missing or underrepresented skills.
    
    User's Current Skills: ${resumeSkills.join(', ')}
    
    Job Description: ${jobDescription}
    
    Return as JSON with keys:
    - missingSoftSkills (array of strings)
    - missingTechnicalSkills (array of strings)
    - developmentRecommendations (array of learning suggestions)
  `;

  try {
    const response = await callOpenAI(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error suggesting skills:', error);
    throw error;
  }
};

const improveSummary = async (currentSummary) => {
  const prompt = `
    Improve this professional summary to make it more impactful, concise, and compelling. 
    Use strong action verbs and highlight key achievements.
    
    Current Summary: "${currentSummary}"
    
    Return only the improved summary as a plain string.
  `;

  try {
    return await callOpenAI(prompt, 500);
  } catch (error) {
    console.error('Error improving summary:', error);
    throw error;
  }
};

const getResumeImprovementSuggestions = async (resumeData, jobDescription) => {
  const prompt = `
    Analyze this resume against the job description and provide specific improvement suggestions.
    
    Resume Data:
    - Summary: ${resumeData.personalInfo?.summary || 'No summary'}
    - Skills: ${resumeData.skills?.map(s => s.name).join(', ') || 'No skills'}
    - Experience: ${resumeData.experience?.length || 0} positions
    
    Job Description: ${jobDescription}
    
    Return as JSON with keys:
    - strengths (array of what they do well)
    - improvements (array of specific improvements)
    - atsOptimizations (array of ATS optimization suggestions)
    - priority (string: "high", "medium", "low")
  `;

  try {
    const response = await callOpenAI(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error getting improvement suggestions:', error);
    throw error;
  }
};

export {
  callOpenAI,
  generateCustomizedResume,
  extractJobKeywords,
  improveBulletPoints,
  suggestMissingSkills,
  improveSummary,
  getResumeImprovementSuggestions
};
