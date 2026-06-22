export interface User {
  id: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  role: 'member' | 'representative' | 'admin';
  isApproved: boolean;
  createdAt: string;
}

export interface StudyCycle {
  id: string;
  subject: string;
  chapter: string;
  startDate: string;
  deadline: string;
  status: 'planning' | 'active' | 'submission_open' | 'completed';
  topics: Topic[];
  submissions?: Submission[];
  createdBy: string;
  createdAt: string;
}

export interface Topic {
  id: string;
  cycleId: string;
  name: string;
  mathNumbers?: string;
  description?: string;
}

export interface Submission {
  id: string;
  cycleId: string;
  userId: string;
  notesUrl: string;
  submittedAt: string;
  user?: User;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'submission_window' | 'new_cycle' | 'cycle_completed';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}