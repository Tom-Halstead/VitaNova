-- 1. Users
CREATE TABLE app_user (
  user_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        VARCHAR(255) UNIQUE NOT NULL,
  name         VARCHAR(100),
  cognito_uuid VARCHAR(100) UNIQUE,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Journal Entries (each includes moods)
CREATE TABLE entry (
  entry_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES app_user(user_id),
  text        TEXT NOT NULL,
  entry_date  DATE NOT NULL,
  mood_pre    SMALLINT CHECK (mood_pre BETWEEN 1 AND 5),
  mood_post   SMALLINT CHECK (mood_post BETWEEN 1 AND 5),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Photos attached to entries
CREATE TABLE photo (
  photo_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id    UUID NOT NULL REFERENCES entry(entry_id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Goals & Milestones
CREATE TABLE user_goal (
  goal_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES app_user(user_id),
  type          VARCHAR(50) NOT NULL,         -- e.g. "entries_logged"
  target_value  INTEGER NOT NULL,
  current_value INTEGER DEFAULT 0,
  due_date      DATE,
  status        VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, EXPIRED
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT now()
);
