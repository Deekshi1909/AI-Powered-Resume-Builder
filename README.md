# AI-Powered Resume Builder

A comprehensive full-stack web application for building, customizing, and optimizing resumes using AI technology. Features include resume generation, ATS scoring, AI-powered suggestions, and PDF export.

## 🌟 Features

### Frontend Features
- **Modern, Responsive UI** - Built with React.js and Tailwind CSS
- **Resume Editor** - Easy-to-use form for entering personal info, education, experience, and skills
- **Real-time Preview** - See your resume update in real-time
- **Multiple Templates** - Choose from Professional, Modern, or Minimal templates
- **File Upload** - Upload PDF resumes, images, or documents for automatic parsing
- **PDF Export** - Download your resume as a PDF file

### AI Features
- **Resume Customization** - Generate tailored resumes based on job descriptions
- **Keyword Extraction** - Extract important skills and keywords from job postings
- **Content Improvement** - AI-powered suggestions for better bullet points
- **Skill Suggestions** - Identify missing skills relevant to the job
- **Grammar Enhancement** - Improve clarity and professional tone

### ATS & Optimization
- **ATS Score Calculator** - Compatibility scoring with Applicant Tracking Systems
- **Detailed Breakdown** - See scores for keywords, formatting, completeness, and more
- **Improvement Suggestions** - Actionable recommendations to increase ATS compatibility

### Community Features
- **Share Success Stories** - Upload resumes that led to successful job offers
- **Learn from Others** - Browse and learn from community resumes
- **Success Metrics** - View, upvote, and see analytics on resumes

## 🏗️ Project Architecture

```
resume-builder/
├── backend/                          # Node.js Express server
│   ├── config/                       # Configuration files
│   │   └── database.js              # JSON-based data storage
│   ├── controllers/                 # Business logic
│   ├── routes/                      # API routes
│   │   ├── resumeRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── fileRoutes.js
│   │   └── communityRoutes.js
│   ├── services/                    # Service layer
│   │   ├── aiService.js            # AI integration with OpenAI
│   │   ├── atsService.js           # ATS scoring logic
│   │   ├── fileProcessor.js        # PDF/Image parsing
│   │   └── pdfGenerator.js         # PDF generation
│   ├── middleware/                  # Custom middleware
│   │   └── uploadMiddleware.js     # File upload handling
│   ├── data/                        # JSON storage
│   │   ├── users.json
│   │   ├── resumes.json
│   │   └── community.json
│   ├── uploads/                     # Uploaded files
│   ├── server.js                    # Main server file
│   ├── package.json
│   └── .env.example
│
├── frontend/                         # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── ResumeEditor.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── ATSChecker.jsx
│   │   │   ├── Community.jsx
│   │   │   └── FileUpload.jsx
│   │   ├── context/                 # React Context
│   │   │   └── ResumeContext.jsx
│   │   ├── api.js                   # API client
│   │   ├── App.js                   # Main App component
│   │   ├── index.js                 # Entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API Key (for AI features)

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd resume-builder/backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Update `.env` with your OpenAI API key:**
```env
PORT=5000
CORS_ORIGIN=http://localhost:3000
AI_API_KEY=your_openai_api_key_here
AI_API_BASE_URL=https://api.openai.com/v1
NODE_ENV=development
```

5. **Start the backend server:**
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd resume-builder/frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start the development server:**
```bash
npm start
```

Application will open at `http://localhost:3000`

## 🔑 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

# AI Configuration (OpenAI)
AI_API_KEY=sk-your-openai-api-key-here
AI_API_BASE_URL=https://api.openai.com/v1

# Optional: Use other AI providers
# Change AI_API_BASE_URL for: Azure OpenAI, Local LLMs, etc.
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📊 API Endpoints

### Resume Endpoints
- `POST /api/resume/create` - Create new resume
- `GET /api/resume/:resumeId` - Get resume by ID
- `GET /api/resume/user/:userId` - Get user's resumes
- `PUT /api/resume/:resumeId` - Update resume
- `DELETE /api/resume/:resumeId` - Delete resume
- `POST /api/resume/ats-score` - Calculate ATS score
- `POST /api/resume/generate-pdf` - Generate PDF

### AI Endpoints
- `POST /api/ai/generate-customized` - Generate customized resume
- `POST /api/ai/extract-keywords` - Extract job keywords
- `POST /api/ai/improve-bullet-point` - Improve bullet point
- `POST /api/ai/suggest-skills` - Suggest missing skills
- `POST /api/ai/improve-summary` - Improve professional summary
- `POST /api/ai/get-suggestions` - Get improvement suggestions

### File Endpoints
- `POST /api/file/upload` - Upload and process file
- `POST /api/file/extract-text` - Extract text from file

### Community Endpoints
- `POST /api/community/upload` - Share resume to community
- `GET /api/community` - Get all community resumes
- `GET /api/community/:resumeId` - Get specific resume
- `GET /api/community/search/:query` - Search community resumes

## 🤖 AI Features Explained

### 1. Resume Customization
Analyzes job description and creates a tailored resume highlighting relevant skills and experience.

### 2. Keyword Extraction
Identifies required and preferred skills, technical keywords, and responsibilities from job postings.

### 3. Bullet Point Improvement
Enhances existing bullet points with action verbs and quantifiable metrics.

### 4. Skill Suggestions
Recommends missing skills and learning opportunities based on job requirements.

### 5. ATS Optimization
Provides specific suggestions to improve Applicant Tracking System compatibility.

## 📈 ATS Score Breakdown

The ATS score is calculated based on 5 factors:

1. **Keyword Match (30%)** - How many job keywords are in your resume
2. **Formatting (20%)** - Proper structure and ATS-friendly formatting
3. **Completeness (25%)** - All major sections filled (experience, education, skills)
4. **Readability (15%)** - Concise bullet points and proper spacing
5. **Optimization (10%)** - Action verbs and quantifiable results

## 📄 Supported File Formats

### Upload Formats
- **PDF** (.pdf)
- **Images** (.jpg, .jpeg, .png, .gif)
- **Documents** (.doc, .docx)
- **Text** (.txt)

### Export Formats
- **PDF** - Multiple template options

## 🎨 Resume Templates

### Professional Template
- Clean, traditional layout
- Suitable for corporate roles
- Emphasis on experience and education

### Modern Template
- Contemporary design with colors
- Great for creative industries
- Visual hierarchy with color blocks

### Minimal Template
- Elegant, simple design
- Time-tested format
- Maximum focus on content

## 💾 Data Storage

The application uses **JSON-based file storage** instead of a database:

- **users.json** - User profiles
- **resumes.json** - User resumes
- **community.json** - Community shared resumes

Data files are located in `backend/data/`

## 🔒 Security

- API keys stored in environment variables (`.env`)
- No sensitive data exposed in frontend code
- CORS enabled for localhost development
- File upload validation and size limits (10MB)

## 🧪 Testing the Application

### 1. Create a Resume
- Fill out personal information
- Add education and experience
- Add skills and certifications
- See real-time preview

### 2. Upload an Existing Resume
- Click file upload component
- Select PDF, image, or document
- System auto-parses and fills sections

### 3. Use AI Features
- Paste a job description
- Generate customized resume
- Extract keywords
- Get improvement suggestions

### 4. Check ATS Score
- Paste job description
- Calculate ATS compatibility score
- Review detailed breakdown
- Implement suggestions

### 5. Export to PDF
- Select template
- Download PDF file
- Use for job applications

### 6. Community Sharing
- View community resumes
- Upload your success story
- Learn from others

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Integration:** OpenAI API (GPT-3.5-turbo)
- **PDF Generation:** PDFKit
- **Document Processing:** pdf-parse, Tesseract.js
- **File Upload:** Multer
- **Data Storage:** JSON files
- **Image Processing:** Sharp

### Frontend
- **Library:** React.js 18
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** React Icons
- **State Management:** React Context API

## 📚 Usage Examples

### Example 1: Customize Resume for Job Description
```bash
POST /api/ai/generate-customized
{
  "resumeData": { ... },
  "jobDescription": "We are looking for a Senior Full Stack Developer..."
}
```

### Example 2: Get ATS Score
```bash
POST /api/resume/ats-score
{
  "resumeData": { ... },
  "jobDescription": "Job posting text..."
}
```

### Example 3: Generate PDF
```bash
POST /api/resume/generate-pdf
{
  "resumeData": { ... },
  "template": "professional"
}
```

## 🔄 Workflow

1. **User Registration/Login** - Initialize user session
2. **Resume Creation** - Enter resume information
3. **Job Description Input** - Paste target job posting
4. **AI Customization** - Generate tailored content
5. **ATS Check** - Calculate compatibility score
6. **Template Selection** - Choose resume design
7. **PDF Export** - Download final resume
8. **Community Share** (Optional) - Share success story

## 📈 Future Enhancements

- [ ] User authentication system
- [ ] MongoDB/PostgreSQL integration
- [ ] LinkedIn profile import
- [ ] Real-time collaboration
- [ ] Resume version history
- [ ] Analytics dashboard
- [ ] Email delivery
- [ ] Telegram bot integration
- [ ] Mobile app
- [ ] Advanced NLP for better parsing
- [ ] Multiple language support
- [ ] Integration with job boards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🎓 Learning Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## ⚠️ Important Notes

1. **API Key Security**: Never commit `.env` file with real API keys to version control
2. **Rate Limiting**: OpenAI API has rate limits; implement caching for production
3. **File Storage**: For production, migrate to cloud storage (S3, Azure Blob, etc.)
4. **Database**: For production, use MongoDB, PostgreSQL, or other persistent database
5. **Authentication**: Implement proper user authentication for production

## 📦 Production Deployment

### Backend
- Use environment variables for all configuration
- Implement proper error handling and logging
- Use reverse proxy (Nginx, Apache)
- Enable HTTPS/SSL
- Use persistent database

### Frontend
- Build for production: `npm run build`
- Use CDN for static files
- Implement caching strategies
- Minify and optimize assets

---

**Built with ❤️ for resume builders everywhere**
