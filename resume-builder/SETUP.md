# Setup Instructions for AI-Powered Resume Builder

## Prerequisites Installation

### 1. Install Node.js and npm

#### Windows
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Accept all defaults
5. Verify installation:
```bash
node --version
npm --version
```

#### macOS
```bash
# Using Homebrew
brew install node
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install nodejs npm
```

### 2. Get OpenAI API Key

1. Visit [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in to your OpenAI account
3. Navigate to "API Keys" in your account settings
4. Click "Create new secret key"
5. Copy and save your API key securely (you won't see it again)
6. Add credits to your OpenAI account for API usage

## Backend Setup (Detailed)

### Step 1: Navigate to Backend Directory
```bash
cd "resume-builder/backend"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express - Web framework
- cors - Cross-origin resource sharing
- dotenv - Environment variable management
- multer - File upload handler
- axios - HTTP client
- pdfkit - PDF generation
- tesseract.js - OCR for images
- sharp - Image processing
- uuid - Unique ID generation
- And more...

Installation may take 2-5 minutes.

### Step 3: Create Environment File

#### Option A: Using Terminal
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

#### Option B: Manual
1. Create a new file named `.env` in the backend directory
2. Copy content from `.env.example`
3. Fill in your values

### Step 4: Update Environment Variables

Open `.env` file and replace with your actual values:

```env
# Server Configuration
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

# AI API Configuration (OpenAI)
AI_API_KEY=sk-your-actual-openai-api-key-here
AI_API_BASE_URL=https://api.openai.com/v1
```

**Important**: Replace `sk-your-actual-openai-api-key-here` with your real OpenAI API key.

### Step 5: Create Data Directory

The backend will automatically create the `data` directory on first run, but you can create it manually:

```bash
# Windows
mkdir data

# macOS/Linux
mkdir -p data
```

### Step 6: Start Backend Server

```bash
npm start
```

You should see:
```
Resume Builder Backend running on http://localhost:5000
```

**Keep this terminal window open** - the server must be running while you use the app.

## Frontend Setup (Detailed)

### Step 1: Open New Terminal Window

Keep the backend terminal open. Open a NEW terminal window in the same root directory.

### Step 2: Navigate to Frontend Directory
```bash
cd "resume-builder/frontend"
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- react - UI library
- react-dom - React rendering
- axios - HTTP client
- react-icons - Icon library
- tailwindcss - Styling framework
- And more...

Installation may take 5-10 minutes.

### Step 4: Start Frontend Development Server
```bash
npm start
```

The application will:
1. Compile React code
2. Open automatically in your browser
3. Display at `http://localhost:3000`

You should see the Resume Builder application with:
- Editor panel on the left
- Preview panel on the right
- Navigation tabs at the top

## Verification Checklist

### Backend Verification
- [ ] Backend terminal shows "Resume Builder Backend running on http://localhost:5000"
- [ ] No error messages in terminal
- [ ] Can visit http://localhost:5000/api/health in browser
- [ ] Browser shows: `{"status":"Server is running","timestamp":"..."}`

### Frontend Verification
- [ ] Frontend opens in browser at http://localhost:3000
- [ ] Can see Resume Builder interface
- [ ] Both editor and preview panels are visible
- [ ] Navigation tabs work
- [ ] No console errors (check browser Developer Tools)

## Testing the Application

### 1. Test Resume Editor
1. Enter "John Doe" in the Name field
2. Add email and phone
3. Add experience, education, and skills
4. See changes in preview panel

### 2. Test File Upload
1. Create a simple text file with resume content
2. Click the file upload section
3. Select and upload the file
4. Verify content is parsed

### 3. Test AI Features
1. Enter your resume information
2. Go to "AI Assistant" tab
3. Paste a job description
4. Click "Customize Resume"
5. See AI-generated content

### 4. Test ATS Checker
1. Go to "ATS Check" tab
2. Paste a job description
3. Click "Calculate ATS Score"
4. View score breakdown

### 5. Test PDF Export
1. Go to "Preview" tab
2. Select a template
3. Click "Download PDF"
4. Verify PDF downloads

## Troubleshooting

### Port Already in Use

If you see "Port 5000 already in use":

#### Windows
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in .env
# Change PORT=5000 to PORT=5001
```

#### macOS/Linux
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env
```

### API Key Issues

If you see "AI API Error":
1. Check your API key in `.env` is correct
2. Verify you have OpenAI credits
3. Check API key starts with "sk-"
4. Visit platform.openai.com to verify key is active

### Module Not Found Errors

If you see "Cannot find module":
```bash
# In the problematic directory, reinstall
rm -rf node_modules package-lock.json

# Windows
rmdir /s /q node_modules
del package-lock.json

# Then reinstall
npm install
```

### Frontend Won't Connect to Backend

If features don't work and console shows fetch errors:
1. Verify backend is running on http://localhost:5000
2. Check CORS is enabled in backend
3. Verify frontend API URL in api.js points to http://localhost:5000

### OCR (Image Parsing) Issues

If image uploading fails:
- Tesseract.js requires internet access first time
- Try uploading images with clear text
- PDF uploads work better than images

## File Structure After Setup

```
resume-builder/
├── backend/
│   ├── node_modules/          # Dependencies (created after npm install)
│   ├── data/                  # JSON storage (created on first run)
│   │   ├── users.json
│   │   ├── resumes.json
│   │   └── community.json
│   ├── uploads/               # Uploaded files (created on first upload)
│   ├── config/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── .env                   # Environment variables (create this!)
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── node_modules/          # Dependencies (created after npm install)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## Running After Initial Setup

### To restart the application:

**Terminal 1 (Backend):**
```bash
cd resume-builder/backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd resume-builder/frontend
npm start
```

## Production Deployment

### Before Deploying:
1. Remove `.env` file from git
2. Add `.env` to `.gitignore`
3. Set up environment variables on hosting platform
4. Use production database instead of JSON
5. Enable HTTPS/SSL certificates
6. Build frontend: `npm run build`
7. Use reverse proxy (Nginx, Apache)
8. Enable caching and compression

### Recommended Hosting:
- **Backend**: Heroku, Railway, DigitalOcean, AWS EC2
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Database**: MongoDB Atlas, PostgreSQL (RDS)
- **Storage**: AWS S3, Azure Blob Storage

## Additional Commands

### Backend
```bash
# Run in development mode (with auto-reload)
npm run dev

# Or manually start
npm start
```

### Frontend
```bash
# Build for production
npm run build

# Run tests
npm test

# Start production build locally
npm install -g serve
serve -s build
```

## Support and Help

### Common Issues Resolved By:
1. Restarting both servers
2. Clearing browser cache (Ctrl+Shift+Delete)
3. Checking browser console (F12)
4. Checking terminal error messages
5. Verifying .env file is properly filled

### Getting Help:
1. Check error messages in terminal
2. Review console errors (Browser DevTools)
3. Verify API key is correct
4. Ensure both servers are running
5. Check README.md for troubleshooting

## Next Steps

1. ✅ Install Node.js
2. ✅ Get OpenAI API key
3. ✅ Setup Backend
4. ✅ Setup Frontend
5. ✅ Test the application
6. Start building and customizing!

---

**Happy Resume Building! 🚀**
