# LMS PorteBosi

A study group progress tracking platform designed to help groups monitor collaborative learning progress.

## Features

- **User Authentication** - Firebase-based Google Sign-In
- **Role-Based Access** - Admin, Representative, and Member roles
- **Study Cycle Management** - Create and manage study phases
- **Progress Tracking** - Monitor submission status and group progress
- **Real-time Notifications** - Stay updated on cycle milestones
- **PWA Support** - Installable as a web app

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Auth**: Firebase Authentication
- **State Management**: Zustand
- **UI Components**: Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- Firebase Account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd lms-portebosi
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Configure your Firebase credentials and database connection in `.env.local`

5. Set up the database
```bash
mysql -u root -p < database/schema.sql
```

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (main)/          # Main authenticated routes
│   ├── admin/           # Admin panel
│   ├── representative/  # Representative panel
│   ├── api/             # API routes
│   ├── auth/            # Auth pages
│   └── layout.tsx       # Root layout
├── components/
│   ├── layout/          # Layout components
│   └── ui/              # UI components
├── lib/
│   ├── firebase.ts      # Firebase config
│   └── mysql.ts         # Database connection
├── store/               # Zustand stores
├── styles/              # Global styles
└── types/               # TypeScript types
```

## User Roles

### Admin
- Approve/reject new members
- View platform analytics
- Manage system settings

### Representative
- Create study cycles
- Manage cycle topics
- View group progress

### Member
- View active study cycles
- Submit notes/progress
- Track personal progress

## Database Schema

See `database/schema.sql` for the complete database schema including:
- Users (with roles and approval status)
- Study Cycles
- Topics
- Submissions
- Notifications
- Study History (for analytics)

## License

MIT
