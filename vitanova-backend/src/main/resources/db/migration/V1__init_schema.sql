-- src/main/resources/db/migration/V1__init_schema.sql

-- 1. Users
CREATE TABLE app_user (
  user_id      BIGSERIAL   PRIMARY KEY,
  email        VARCHAR(255) NOT NULL UNIQUE,
  name         VARCHAR(100),
  cognito_uuid VARCHAR(100) UNIQUE,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Journal Entries
CREATE TABLE entry (
  entry_id    BIGSERIAL   PRIMARY KEY,
  user_id     BIGINT      NOT NULL REFERENCES app_user(user_id),
  text        TEXT        NOT NULL,
  entry_date  DATE        NOT NULL,
  mood_pre    INTEGER    NOT NULL CHECK (mood_pre BETWEEN 1 AND 10),
  mood_post   INTEGER    NOT NULL CHECK (mood_post BETWEEN 1 AND 10),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Photos
CREATE TABLE photo (
  photo_id    BIGSERIAL   PRIMARY KEY,
  entry_id    BIGINT      NOT NULL REFERENCES entry(entry_id) ON DELETE CASCADE,
  url         TEXT        NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Goals & Milestones
CREATE TABLE user_goal (
  goal_id       BIGSERIAL   PRIMARY KEY,
  user_id       BIGINT      NOT NULL REFERENCES app_user(user_id),
  type          VARCHAR(50) NOT NULL,
  target_value  INTEGER     NOT NULL,
  current_value INTEGER     NOT NULL DEFAULT 0,
  due_date      DATE,
  status        VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (status IN ('ACTIVE','COMPLETED','EXPIRED'))
);

-- (Optional) Index foreign keys for performance:
CREATE INDEX idx_entry_user_id ON entry(user_id);
CREATE INDEX idx_photo_entry_id ON photo(entry_id);
CREATE INDEX idx_goal_user_id ON user_goal(user_id);
