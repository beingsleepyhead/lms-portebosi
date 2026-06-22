-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  firebase_uid VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  photo_url VARCHAR(255),
  role ENUM('member', 'representative', 'admin') DEFAULT 'member',
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_is_approved (is_approved)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Study Cycles table
CREATE TABLE IF NOT EXISTS study_cycles (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  subject VARCHAR(255) NOT NULL,
  chapter VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  deadline DATE NOT NULL,
  study_phase_duration INT DEFAULT 7,
  status ENUM('planning', 'active', 'submission_open', 'completed') DEFAULT 'planning',
  submission_window_opened_at TIMESTAMP NULL,
  created_by VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_deadline (deadline),
  INDEX idx_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Topics table
CREATE TABLE IF NOT EXISTS topics (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  cycle_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  math_numbers TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cycle_id) REFERENCES study_cycles(id) ON DELETE CASCADE,
  INDEX idx_cycle_id (cycle_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  cycle_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  notes_url VARCHAR(255) NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cycle_id) REFERENCES study_cycles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_submission (cycle_id, user_id),
  INDEX idx_cycle_id (cycle_id),
  INDEX idx_user_id (user_id),
  INDEX idx_submitted_at (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  type ENUM('submission_window', 'new_cycle', 'cycle_completed') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSON,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Study History table (for analytics and historical records)
CREATE TABLE IF NOT EXISTS study_history (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  cycle_id VARCHAR(36) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  chapter VARCHAR(255) NOT NULL,
  total_members INT DEFAULT 0,
  submitted_members INT DEFAULT 0,
  completion_percentage FLOAT DEFAULT 0,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cycle_id) REFERENCES study_cycles(id),
  INDEX idx_subject (subject),
  INDEX idx_completed_at (completed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
