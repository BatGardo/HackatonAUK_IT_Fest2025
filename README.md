# HireMind - AI-Powered Career Platform

HireMind is a comprehensive career development platform that helps job seekers create professional CVs and practice interviews with AI-powered feedback. Built for the AUK IT Fest 2025 Hackathon.

## 🚀 Features

### 📄 CV Builder
- **Manual Mode**: Traditional form-based CV creation with multiple sections
- **AI Generation Mode**: Generate complete CVs from natural language descriptions
- **Professional Templates**: Modern and Classic CV templates
- **Real-time Preview**: Live preview as you build your CV
- **PDF Export**: Download your CV as a professional PDF
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎤 Interview Practice
- **AI Question Generation**: Personalized interview questions based on job position
- **Answer Evaluation**: AI-powered feedback on your responses
- **Progress Tracking**: Question navigation and completion tracking
- **Performance Insights**: Detailed feedback on answer quality and suggestions for improvement
- **Position-Specific**: Tailored questions for different job roles

### 🌐 Internationalization
- **Bilingual Support**: English and Ukrainian language support
- **Real-time Switching**: Language changes apply immediately across the app
- **Persistent Preferences**: Language selection saved to localStorage

### 🔐 User Management
- **Google OAuth**: Secure authentication via Google
- **Profile Management**: Edit personal information
- **Account Deletion**: Complete data removal option

## 🏗️ Project Structure

```
HackatonAUK_IT_Fest2025/
├── frontend/hire-mind-frontend/          # React Frontend
│   ├── src/
│   │   ├── api/                           # API communication layer
│   │   │   ├── auth.ts                    # Authentication endpoints
│   │   │   ├── interview.ts               # AI interview & CV generation
│   │   │   └── axios.ts                   # HTTP client configuration
│   │   ├── components/                    # Reusable UI components
│   │   │   ├── Header/                    # Navigation header with language toggle
│   │   │   ├── CVPreview/                 # CV template rendering
│   │   │   ├── Logo/                      # Brand logo component
│   │   │   ├── PopUp/                     # Modal dialogs
│   │   │   └── base/                      # Base UI components
│   │   │       └── buttons/               # Button components
│   │   ├── pages/                         # Main application pages
│   │   │   ├── HomePage/                  # Landing page
│   │   │   ├── CVBuilderPage/            # CV creation interface
│   │   │   ├── InterviewPage/            # Interview practice
│   │   │   └── ProfilePage/              # User profile management
│   │   ├── i18n/                         # Internationalization
│   │   │   └── i18n.ts                   # Language configuration
│   │   └── types/                        # TypeScript type definitions
│   ├── package.json                      # Frontend dependencies
│   └── tailwind.config.js               # Styling configuration
└── app/                              # Backend services
    ├── security/                             # Authentication service and account
    |-- schemas/
    ├── views/                               # Routers
    ├── database/                         # Data persistence layer
    └── services/                         # Gemini integration

    
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **React Router** for client-side navigation
- **React i18next** for internationalization
- **Tailwind CSS** for responsive styling
- **React-to-Print** for PDF generation
- **Axios** for HTTP requests

### Backend
- **Python** runtime environment
- **FastAPI** web framework
- **Google OAuth 2.0** for authentication
- **Gemini AI API** for interview questions and CV generation
- **Database integration** for user data persistence

### AI Integration
- **Gemini AI** for natural language processing
- **Interview question generation** based on job positions
- **Answer evaluation** with detailed feedback
- **CV content generation** from user descriptions

## 🔒 Data Privacy

**Important**: This application prioritizes user privacy:

- **Minimal Data Collection**: Only user name and email address are stored on the backend
- **No CV Storage**: CV data is processed locally and not permanently stored on servers
- **Session-based**: All CV and interview data exists only during the user session
- **Google OAuth**: Secure authentication without storing passwords

### What is Stored:
- ✅ User name (from Google profile)
- ✅ User email address (from Google profile)
- ✅ Authentication tokens (temporary, for session management)

### What is NOT Stored:
- ❌ CV content or personal details
- ❌ Interview answers or practice sessions
- ❌ Generated AI responses
- ❌ Personal documents or files


### Installation

The application will be available at `https://hackatonauk-it-fest2025onrender.com`

## 🌟 Key Features Overview

### CV Builder Modes
1. **Manual Mode**: Step-by-step form filling with sections for:
   - Professional title and summary
   - Education history
   - Work experience
   - Skills with proficiency levels

2. **AI Mode**: Natural language input that generates:
   - Complete CV structure
   - Professional summaries
   - Formatted experience entries
   - Skill categorization

### Interview Practice Flow
1. **Position Setup**: Enter the job title you're applying for
2. **AI Question Generation**: Receive 5-8 relevant interview questions
3. **Practice Responses**: Type your answers with word count guidance
4. **AI Feedback**: Get detailed evaluation and improvement suggestions

## 📄 License

This project was created for educational and hackathon purposes. Please refer to the license file for usage terms.

---

**Built with ❤️ for AUK IT Fest 2025 Hackathon**