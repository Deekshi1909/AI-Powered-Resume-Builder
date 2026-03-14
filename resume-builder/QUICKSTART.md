# Quick Start Guide

## 1️⃣ Prerequisites (5 minutes)

### Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download LTS version
3. Run installer with default settings
4. Verify: `node --version` & `npm --version`

### Get OpenAI API Key
1. Visit [platform.openai.com](https://platform.openai.com/)
2. Create/login account
3. Go to API Keys section
4. Create new secret key
5. **Save it carefully** - you won't see it again!
6. Add credits to account ($5-10 for testing)

---

## 2️⃣ Backend Setup (5 minutes)

### Terminal 1 - Backend
```bash
cd resume-builder/backend
npm install
```

Create `.env` file:
```env
PORT=5000
CORS_ORIGIN=http://localhost:3000
AI_API_KEY=sk-your-actual-api-key-here
AI_API_BASE_URL=https://api.openai.com/v1
NODE_ENV=development
```

Start server:
```bash
npm start
```

✅ Should say: "Resume Builder Backend running on http://localhost:5000"

---

## 3️⃣ Frontend Setup (5 minutes)

### Terminal 2 - Frontend (NEW WINDOW)
```bash
cd resume-builder/frontend
npm install
npm start
```

✅ Should open browser at http://localhost:3000

---

## ✨ You're Ready!

The application is now running with:
- ✅ Resume Editor
- ✅ AI Customization
- ✅ ATS Scoring
- ✅ PDF Export
- ✅ Community Sharing

---

## 🧪 Quick Test

1. **Editor**: Fill out your resume details
2. **AI**: Paste a job description, click "Customize Resume"
3. **ATS**: Paste job description, calculate score
4. **Preview**: Change template and download PDF

---

## 🔒 Important

- **Never share your API key**
- **Don't commit `.env` to git**
- API calls cost money - monitor usage if testing heavily

---

## 📚 Full Guides

- **Detailed Setup**: See `SETUP.md`
- **API Documentation**: See `API.md`
- **Features Overview**: See `README.md`

---

## ⚠️ If Something Goes Wrong

1. Check both terminals show no errors
2. Verify API key is correct
3. Try "npm install" again
4. Clear browser cache (Ctrl+Shift+Delete)
5. Restart both servers

---

**Ready to build amazing resumes! 🚀**
