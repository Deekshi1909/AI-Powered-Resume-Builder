# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API uses simple user ID-based access. In production, implement JWT or OAuth.

---

## Resume Endpoints

### Create Resume
**POST** `/resume/create`

Creates a new resume for a user.

**Request Body:**
```json
{
  "userId": "user_123",
  "resumeData": {
    "personalInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "(123) 456-7890",
      "location": "San Francisco, CA",
      "summary": "Experienced full-stack developer..."
    },
    "experience": [
      {
        "position": "Senior Developer",
        "company": "Tech Corp",
        "startDate": "Jan 2021",
        "endDate": "Present",
        "responsibilities": ["Led team of 5 developers", "Improved performance by 40%"]
      }
    ],
    "education": [
      {
        "school": "University Name",
        "degree": "Bachelor's",
        "field": "Computer Science",
        "graduationYear": 2020
      }
    ],
    "skills": [
      {"name": "React", "proficiency": "Expert"},
      {"name": "Node.js", "proficiency": "Expert"}
    ],
    "certifications": []
  },
  "template": "professional",
  "jobDescription": "Optional: Job description this resume is tailored for"
}
```

**Response:**
```json
{
  "success": true,
  "resume": {
    "id": "uuid-string",
    "userId": "user_123",
    "resumeData": {...},
    "template": "professional",
    "createdAt": "2024-01-20T10:30:00Z",
    "updatedAt": "2024-01-20T10:30:00Z"
  }
}
```

### Get Resume
**GET** `/resume/:resumeId`

Retrieves a specific resume.

**Response:**
```json
{
  "id": "uuid-string",
  "userId": "user_123",
  "resumeData": {...},
  "template": "professional",
  "createdAt": "2024-01-20T10:30:00Z",
  "updatedAt": "2024-01-20T10:30:00Z"
}
```

### Get User Resumes
**GET** `/resume/user/:userId`

Gets all resumes for a specific user.

**Response:**
```json
[
  {
    "id": "uuid-1",
    "userId": "user_123",
    "resumeData": {...},
    "template": "professional",
    "createdAt": "2024-01-20T10:30:00Z"
  },
  {
    "id": "uuid-2",
    "userId": "user_123",
    "resumeData": {...},
    "template": "modern",
    "createdAt": "2024-01-19T14:20:00Z"
  }
]
```

### Update Resume
**PUT** `/resume/:resumeId`

Updates an existing resume.

**Request Body:**
```json
{
  "resumeData": {...},
  "template": "modern"
}
```

**Response:**
```json
{
  "success": true,
  "resume": {...}
}
```

### Delete Resume
**DELETE** `/resume/:resumeId`

Deletes a resume.

**Response:**
```json
{
  "success": true,
  "message": "Resume deleted"
}
```

### Calculate ATS Score
**POST** `/resume/ats-score`

Calculates ATS compatibility score for a resume against a job description.

**Request Body:**
```json
{
  "resumeData": {...},
  "jobDescription": "We are looking for a Senior Full Stack Developer with..."
}
```

**Response:**
```json
{
  "totalScore": 78,
  "breakdown": {
    "keywordMatch": 85,
    "formatting": 90,
    "completeness": 70,
    "readability": 75,
    "optimization": 65
  },
  "suggestions": [
    {
      "category": "Keywords",
      "priority": "high",
      "suggestion": "Add more relevant keywords from the job description"
    },
    {
      "category": "Optimization",
      "priority": "medium",
      "suggestion": "Use more action verbs in bullet points"
    }
  ]
}
```

### Generate PDF
**POST** `/resume/generate-pdf`

Generates a PDF file from resume data.

**Request Body:**
```json
{
  "resumeData": {...},
  "template": "professional"
}
```

**Response:**
```json
{
  "success": true,
  "fileName": "resume_1234567890.pdf",
  "downloadUrl": "/uploads/resume_1234567890.pdf"
}
```

---

## AI Endpoints

### Generate Customized Resume
**POST** `/ai/generate-customized`

Generates customized resume content based on job description.

**Request Body:**
```json
{
  "resumeData": {...},
  "jobDescription": "Job posting text..."
}
```

**Response:**
```json
{
  "summary": "Results-driven Full Stack Developer with 5+ years...",
  "bulletPoints": [
    "Led development of microservices architecture...",
    "Optimized database queries reducing query time by 45%...",
    "Mentored 3 junior developers..."
  ],
  "topSkills": ["React", "Node.js", "MongoDB", "AWS", "Docker"]
}
```

### Extract Keywords
**POST** `/ai/extract-keywords`

Extracts important keywords and skills from job description.

**Request Body:**
```json
{
  "jobDescription": "Job posting text..."
}
```

**Response:**
```json
{
  "requiredSkills": ["React", "Node.js", "MongoDB", "REST APIs"],
  "preferredSkills": ["Docker", "Kubernetes", "AWS"],
  "technicalKeywords": ["microservices", "scalability", "performance"],
  "responsibilities": [
    "Develop and maintain full-stack applications",
    "Collaborate with product and design teams"
  ]
}
```

### Improve Bullet Point
**POST** `/ai/improve-bullet-point`

Improves a specific resume bullet point.

**Request Body:**
```json
{
  "bulletPoint": "Worked on the backend system",
  "jobDescription": "Job posting text..."
}
```

**Response:**
```json
{
  "improvedBulletPoint": "Architected and deployed RESTful APIs serving 100K+ daily requests, resulting in 35% improvement in system performance"
}
```

### Suggest Missing Skills
**POST** `/ai/suggest-skills`

Suggests skills that could be added based on job requirements.

**Request Body:**
```json
{
  "currentSkills": ["React", "JavaScript", "CSS"],
  "jobDescription": "We need someone with React, Node.js, MongoDB, Docker..."
}
```

**Response:**
```json
{
  "missingSoftSkills": ["Team Leadership", "Project Management"],
  "missingTechnicalSkills": ["Node.js", "MongoDB", "Docker"],
  "developmentRecommendations": [
    "Take a Node.js and Express course",
    "Learn Docker containerization",
    "Practice MongoDB queries"
  ]
}
```

### Improve Summary
**POST** `/ai/improve-summary`

Improves professional summary.

**Request Body:**
```json
{
  "summary": "I am a developer with experience in web development"
}
```

**Response:**
```json
{
  "improvedSummary": "Results-driven Full Stack Developer with 5+ years of experience building scalable web applications. Proven track record of delivering high-quality software solutions using React, Node.js, and modern cloud technologies."
}
```

### Get Suggestions
**POST** `/ai/get-suggestions`

Gets comprehensive improvement suggestions.

**Request Body:**
```json
{
  "resumeData": {...},
  "jobDescription": "Job posting text..."
}
```

**Response:**
```json
{
  "strengths": [
    "Strong technical background",
    "Relevant experience with required technologies"
  ],
  "improvements": [
    "Expand on quantifiable achievements",
    "Add more specific metrics to accomplishments"
  ],
  "atsOptimizations": [
    "Add more keywords from job description",
    "Use standard formatting for dates"
  ],
  "priority": "high"
}
```

---

## File Upload Endpoints

### Upload File
**POST** `/file/upload`

Uploads and processes a resume file (PDF, image, or document).

**Form Data:**
```
file: <binary file data>
```

**Supported Formats:**
- PDF (.pdf)
- Images (.jpg, .jpeg, .png, .gif)
- Documents (.doc, .docx)
- Text (.txt)
- Max size: 10MB

**Response:**
```json
{
  "success": true,
  "fileName": "resume_1234567890.pdf",
  "extractedText": "John Doe...",
  "parsedResume": {
    "personalInfo": {
      "email": "john@example.com",
      "phone": "123-456-7890",
      "summary": "Experienced developer..."
    },
    "experience": [...],
    "education": [...],
    "skills": [...]
  }
}
```

### Extract Text
**POST** `/file/extract-text`

Extracts text from a previously uploaded file.

**Request Body:**
```json
{
  "fileName": "resume_1234567890.pdf",
  "mimeType": "application/pdf"
}
```

**Response:**
```json
{
  "success": true,
  "extractedText": "Full resume text content..."
}
```

---

## Community Endpoints

### Upload Resume to Community
**POST** `/community/upload`

Shares a resume with the community.

**Request Body:**
```json
{
  "resumeData": {...},
  "userId": "user_123",
  "userName": "John Doe",
  "jobTitle": "Senior Full Stack Developer",
  "company": "Tech Corp",
  "feedback": "This resume helped me land my dream job! I focused on quantifiable achievements..."
}
```

**Response:**
```json
{
  "success": true,
  "resume": {
    "id": "uuid-string",
    "userId": "user_123",
    "userName": "John Doe",
    "jobTitle": "Senior Full Stack Developer",
    "company": "Tech Corp",
    "resumeData": {...},
    "feedback": "...",
    "uploadedAt": "2024-01-20T10:30:00Z",
    "views": 0,
    "upvotes": 0
  }
}
```

### Get All Community Resumes
**GET** `/community`

Retrieves all resumes from the community (sorted by most recent).

**Response:**
```json
[
  {
    "id": "uuid-1",
    "userName": "John Doe",
    "jobTitle": "Senior Full Stack Developer",
    "company": "Tech Corp",
    "resumeData": {...},
    "feedback": "...",
    "uploadedAt": "2024-01-20T10:30:00Z",
    "views": 245,
    "upvotes": 42
  },
  ...
]
```

### Get Community Resume by ID
**GET** `/community/:resumeId`

Gets a specific community resume and increments view count.

**Response:**
```json
{
  "id": "uuid-string",
  "userName": "John Doe",
  "jobTitle": "...",
  "company": "...",
  "resumeData": {...},
  "feedback": "...",
  "uploadedAt": "2024-01-20T10:30:00Z",
  "views": 246,
  "upvotes": 42
}
```

### Search Community Resumes
**GET** `/community/search/:query`

Searches community resumes by job title, company, or user name.

**Example:**
```
GET /community/search/React
```

**Response:**
```json
[
  {
    "id": "uuid-1",
    "userName": "Jane Smith",
    "jobTitle": "React Developer",
    "company": "StartUp Inc",
    "resumeData": {...},
    "views": 123,
    "upvotes": 18
  },
  ...
]
```

---

## Health Check

### Health Status
**GET** `/health`

Simple health check endpoint.

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-20T10:35:00Z"
}
```

---

## Error Responses

All endpoints return standard error responses:

```json
{
  "error": "Error message describing what went wrong",
  "status": 400
}
```

### HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

For production, implement rate limiting:
- Frontend: 10 requests per second per IP
- AI endpoints: 5 requests per minute (due to OpenAI costs)
- File upload: 2 requests per minute

---

## Pagination (Future Enhancement)

Future version will support pagination:

```
GET /community?page=1&limit=10
```

---

## Webhooks (Future Enhancement)

Future version will support webhooks for:
- Resume updates
- ATS score changes
- Community upvotes
- Achievement milestones

---

**For more details, see README.md**
