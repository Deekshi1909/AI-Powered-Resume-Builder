// ATS Score Calculator
class ATSScoreCalculator {
  constructor() {
    this.weights = {
      keywordMatch: 0.30,
      formatting: 0.20,
      completeness: 0.25,
      readability: 0.15,
      optimization: 0.10
    };
  }

  calculateScore(resumeData, jobDescription) {
    const keywordScore = this.calculateKeywordMatch(resumeData, jobDescription);
    const formattingScore = this.calculateFormattingScore(resumeData);
    const completenessScore = this.calculateCompletenessScore(resumeData);
    const readabilityScore = this.calculateReadabilityScore(resumeData);
    const optimizationScore = this.calculateOptimizationScore(resumeData);

    const totalScore = 
      (keywordScore * this.weights.keywordMatch) +
      (formattingScore * this.weights.formatting) +
      (completenessScore * this.weights.completeness) +
      (readabilityScore * this.weights.readability) +
      (optimizationScore * this.weights.optimization);

    return {
      totalScore: Math.round(totalScore),
      breakdown: {
        keywordMatch: Math.round(keywordScore),
        formatting: Math.round(formattingScore),
        completeness: Math.round(completenessScore),
        readability: Math.round(readabilityScore),
        optimization: Math.round(optimizationScore)
      },
      suggestions: this.generateSuggestions(
        keywordScore,
        formattingScore,
        completenessScore,
        readabilityScore,
        optimizationScore
      )
    };
  }

  calculateKeywordMatch(resumeData, jobDescription) {
    const jobKeywords = this.extractKeywords(jobDescription);
    const resumeText = this.convertResumeToText(resumeData);
    const resumeKeywords = this.extractKeywords(resumeText);

    let matchCount = 0;
    jobKeywords.forEach(keyword => {
      if (resumeKeywords.includes(keyword)) {
        matchCount++;
      }
    });

    return (matchCount / jobKeywords.length) * 100;
  }

  calculateFormattingScore(resumeData) {
    let score = 100;

    // Check for proper structure
    if (!resumeData.personalInfo?.name) score -= 15;
    if (!resumeData.personalInfo?.email) score -= 10;
    if (!resumeData.personalInfo?.phone) score -= 10;

    // Check for sections
    if (!resumeData.experience || resumeData.experience.length === 0) score -= 20;
    if (!resumeData.education || resumeData.education.length === 0) score -= 15;

    // Check for special characters that might cause ATS issues
    const resumeText = this.convertResumeToText(resumeData);
    const specialCharCount = (resumeText.match(/[^a-zA-Z0-9\s.,\-]/g) || []).length;
    if (specialCharCount > 50) score -= 10;

    return Math.max(0, score);
  }

  calculateCompletenessScore(resumeData) {
    let score = 0;
    const sections = [
      { name: 'personalInfo', weight: 20 },
      { name: 'experience', weight: 25 },
      { name: 'education', weight: 20 },
      { name: 'skills', weight: 20 },
      { name: 'certifications', weight: 15 }
    ];

    sections.forEach(section => {
      const hasSection = resumeData[section.name] && 
        (Array.isArray(resumeData[section.name]) ? resumeData[section.name].length > 0 : Object.keys(resumeData[section.name]).length > 0);
      if (hasSection) {
        score += section.weight;
      }
    });

    return score;
  }

  calculateReadabilityScore(resumeData) {
    let score = 100;

    // Check for short bullet points (ideal is 1-2 lines)
    if (resumeData.experience) {
      resumeData.experience.forEach(exp => {
        if (exp.responsibilities) {
          exp.responsibilities.forEach(resp => {
            // Deduct if response is too long
            if (resp.length > 200) score -= 2;
          });
        }
      });
    }

    // Check for consistent formatting
    const summaryLength = resumeData.personalInfo?.summary?.length || 0;
    if (summaryLength < 50 || summaryLength > 300) score -= 10;

    score = Math.max(0, Math.min(100, score));
    return score;
  }

  calculateOptimizationScore(resumeData) {
    let score = 100;

    const resumeText = this.convertResumeToText(resumeData);

    // Check for action verbs
    const actionVerbs = [
      'achieved', 'accomplished', 'designed', 'developed', 'improved', 'increased',
      'implemented', 'managed', 'led', 'created', 'optimized', 'enhanced',
      'reduced', 'streamlined', 'established', 'coordinated', 'designed'
    ];

    let verbCount = 0;
    actionVerbs.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'gi');
      verbCount += (resumeText.match(regex) || []).length;
    });

    if (verbCount < 5) score -= 20;

    // Check for quantifiable metrics
    const metricsRegex = /\d+%|\$\d+|increased|decreased|improved/gi;
    const metrics = resumeText.match(metricsRegex) || [];
    if (metrics.length < 3) score -= 15;

    // Check for relevant technical skills
    if (!resumeData.skills || resumeData.skills.length < 5) score -= 15;

    return Math.max(0, score);
  }

  extractKeywords(text) {
    // Remove common words and extract important keywords
    const commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'been', 'be',
      'have', 'has', 'do', 'does', 'did', 'will', 'would', 'should', 'could',
      'may', 'might', 'must', 'can', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
    ]);

    return text
      .toLowerCase()
      .split(/[\s,.\-]+/)
      .filter(word => word.length > 3 && !commonWords.has(word))
      .slice(0, 50); // Return top 50 unique keywords
  }

  convertResumeToText(resumeData) {
    let text = '';

    if (resumeData.personalInfo) {
      text += `${resumeData.personalInfo.name || ''} ${resumeData.personalInfo.email || ''} ${resumeData.personalInfo.summary || ''} `;
    }

    if (resumeData.experience) {
      resumeData.experience.forEach(exp => {
        text += `${exp.company || ''} ${exp.position || ''} ${exp.description || ''} `;
        if (exp.responsibilities) {
          text += exp.responsibilities.join(' ');
        }
      });
    }

    if (resumeData.education) {
      resumeData.education.forEach(edu => {
        text += `${edu.school || ''} ${edu.degree || ''} ${edu.field || ''} `;
      });
    }

    if (resumeData.skills) {
      text += resumeData.skills.map(s => s.name).join(' ');
    }

    return text;
  }

  generateSuggestions(keyword, formatting, completeness, readability, optimization) {
    const suggestions = [];

    if (keyword < 70) {
      suggestions.push({
        category: 'Keywords',
        priority: 'high',
        suggestion: 'Add more relevant keywords from the job description to improve matching'
      });
    }

    if (formatting < 70) {
      suggestions.push({
        category: 'Formatting',
        priority: 'high',
        suggestion: 'Ensure proper resume structure with clear sections and no special characters'
      });
    }

    if (completeness < 80) {
      suggestions.push({
        category: 'Completeness',
        priority: 'high',
        suggestion: 'Fill in all resume sections: personal info, experience, education, and skills'
      });
    }

    if (readability < 70) {
      suggestions.push({
        category: 'Readability',
        priority: 'medium',
        suggestion: 'Keep bullet points concise and focused on achievements'
      });
    }

    if (optimization < 70) {
      suggestions.push({
        category: 'Optimization',
        priority: 'medium',
        suggestion: 'Use action verbs and include quantifiable results in your bullet points'
      });
    }

    return suggestions;
  }
}

export default ATSScoreCalculator;
