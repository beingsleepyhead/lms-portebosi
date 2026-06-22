# LMS PorteBosi - Study Group Progress Tracking Platform

A private study-group progress tracking platform designed for university students to coordinate study progress, track submissions, and maintain study history.

## 🎯 Project Overview

This application helps study groups progress through subjects and chapters together in a structured way while maintaining accountability and preserving study history.

### Core Purpose
- **Track** what the group is currently studying
- **Monitor** who has submitted and who's behind
- **Maintain** complete study history organized by subject and chapter
- **Ensure** accountability through structured study cycles

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MySQL database (AlwaysData provided)
- Firebase project (configured)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/beingsleepyhead/lms-portebosi.git
cd lms-portebosi
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.local .env.local
```
Fill in your Firebase and MySQL credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# ... other Firebase configs
MYSQL_HOST=mysql-portebosi.alwaysdata.net
MYSQL_USER=portebosi
MYSQL_PASSWORD=...
MYSQL_DATABASE=portebosi_db
```

4. **Setup database**
```bash
# Run schema.sql in your MySQL database via phpMyAdmin or MySQL CLI
mysql -h mysql-portebosi.alwaysdata.net -u portebosi -p portebosi_db < database/schema.sql
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Features

### ✅ Authentication
- Gmail-only registration (Firebase)
- Admin auto-assigned: `mail.ayaan07@gmail.com`
- Admin approval required for new members
- Role-based access (Member, Representative, Admin)

### ✅ Study Cycles
- Create cycles with Subject, Chapter, Topics (with math numbers), Deadline
- Two phases: Study Phase + Submission Phase
- Auto/Manual submission window opening
- Completion requires 100% member submissions
- Beautiful countdown timers

### ✅ Submission Tracking
- Track submitted vs pending members
- Google Drive submission links (opens externally)
- Timestamp tracking
- Completion percentage

### ✅ Progress Tracking
- Subject Progress: Total/Completed/Remaining chapters + %
- Group Progress: Active, Completed, Pending cycles
- Individual Progress: Submission history, completion rate

### ✅ Study History
- Hierarchical drill-down: Subject → Chapter → Topics
- Access all notes and completion records
- Beautiful browsable interface
- Preserves full study hierarchy

### ✅ Notifications (PWA)
- "Submission window opened" notifications
- "New cycle started" with syllabus
- In-app notification center
- Deadline countdown display

### ✅ Admin Panel
- User management & approval workflow
- Assign/remove Group Representatives
- View all study activity
- System analytics

### ✅ Representative Panel
- Create study cycles
- Manage submissions
- Monitor progress
- Start next cycle

### ✅ PWA Features
- Offline support
- Push notifications
- Install as app
- Fast loading

## 📊 Database Schema

### Users
- Authentication & role management
- Approval workflow

### Study Cycles
- Subject, Chapter, Topics
- Deadlines and status tracking

### Submissions
- Member submissions per cycle
- Timestamp & document tracking

### Notifications
- User notifications (push & in-app)
- Types: new_cycle, submission_window, cycle_completed

### Study History
- Permanent record of completed cycles
- Progress analytics
- Historical browsing

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login pages
│   ├── (main)/          # Protected routes
│   │   ├── dashboard/   # Main dashboard
│   │   ├── cycles/      # Cycle management
│   │   ├── history/     # Study history
│   │   └── profile/     # User profile
│   ├── admin/           # Admin panel
│   └── representative/  # Rep panel
├── components/
│   ├── auth/            # Auth components
│   ├── cycles/          # Cycle components
│   ├── submissions/     # Submission components
│   ├── notifications/   # Notification components
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout components
├── lib/
│   ├── firebase.ts      # Firebase config
│   ├── mysql.ts         # MySQL connection
│   └── auth.ts          # Auth utilities
├── store/               # Zustand stores
├── types/               # TypeScript types
├── api/                 # API routes
└── styles/              # Global styles
```

## 🔑 Key Features Details

### Study Cycles
- **Planning** → **Active** (Study Phase with timer) → **Submission Open** → **Completed**
- Multiple concurrent cycles allowed
- Auto-open or manual submission window
- Real-time submission tracking

### Notifications
- Push notifications (PWA) on submission window open
- New cycle notifications with syllabus
- In-app notification center
- Deadline countdown

### Study History
Subject → Chapter hierarchical browsing:
```
Mathematics
├── Chapter 1: Algebra
│   ├── Topic 1: Linear Equations (Math 1.1.1, 1.1.2, ...)
│   ├── Topic 2: Quadratic Equations (Math 1.2.1, 1.2.2, ...)
│   └── [View all notes & submissions]
├── Chapter 2: Calculus
│   └── [Similar structure]
└── ... more chapters
```

### Admin Account
- Email: `mail.ayaan07@gmail.com` (auto-assigned as admin)
- Approve/reject registrations
- Manage user roles
- View analytics
- System settings

### Rep Access
- Header icon for rep panel
- Create & manage cycles
- Monitor submissions
- Track progress

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Vercel
```bash
vercel
```

## 📝 API Routes

### Auth
- `POST /api/auth/register` - Register new user
- `GET /api/auth/user` - Get current user

### Cycles
- `GET /api/cycles` - List all cycles
- `POST /api/cycles` - Create cycle
- `GET /api/cycles/[id]` - Get cycle details
- `PATCH /api/cycles/[id]` - Update cycle

### Submissions
- `POST /api/submissions` - Submit notes
- `GET /api/submissions/[cycleId]` - Get submissions for cycle

### Admin
- `GET /api/admin/users` - List all users
- `PATCH /api/admin/users` - Approve/reject user

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **PWA**: next-pwa, workbox
- **Auth**: Firebase Authentication
- **Real-time**: Firestore
- **Database**: MySQL (AlwaysData)
- **State**: Zustand
- **Notifications**: react-hot-toast
- **Icons**: Lucide React

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Private - Portebosi Study Group

## 📧 Contact

For questions or support, contact the project owner.

---

**Last Updated**: June 2026
**Version**: 0.1.0
