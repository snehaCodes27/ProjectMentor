# 🚀 Project Mentor - The Digital Team Lead



Project Mentor is a web application designed to solve the chaos of student projects and hackathons. It acts as a **Digital Team Lead**, helping teams generate ideas, manage tasks, track progress, and communicate effectively—all in one place.

## 🌟 Features

### 👑 For Leaders
- **AI Project Generation**: Generate tailored project ideas (Problem, Solution, Key Features) based on domain, type, and skill level.
- **Team Management**: Create teams, generate unique join codes, and manage member requests.
- **Task Orchestration**: Assign tasks, set deadlines, and track individual contributions.
- **Progress Tracking**: Visual "Ring of Progress" to see how close the team is to the finish line.

### 👤 For Members
- **Instant Onboarding**: Join teams instantly with a 6-digit code.
- **Clear Workflows**: See exactly what tasks are assigned to you and mark them as done.
- **Submissions**: Submit work links directly through the dashboard.
- **Team Chat**: Built-in messaging to resolve blockers quickly.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Vanilla CSS (Glassmorphism UI)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Firebase Auth (for Leaders)
- **AI Integration**: AI-powered Project Generator


---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas Connection String
- Firebase Project Configuration

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/project-mentor.git
   cd project-mentor
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   *Create a `.env` file in the `server` folder:*
   ```env
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
   *Run Server:*
   ```bash
   npm run dev
   # Server runs on http://localhost:5001
   ```

3. **Setup Frontend**
   ```bash
   cd ../client/projectmentor
   npm install
   ```
   *Create a `.env` file in the `client/projectmentor` folder:*
   ```env
   VITE_API_BASE_URL=http://localhost:5001
   ```
   *Run Client:*
   ```bash
   npm run dev
   # Client runs on http://localhost:5173
   ```



**Built with 💜 by Sneha Matkar**
