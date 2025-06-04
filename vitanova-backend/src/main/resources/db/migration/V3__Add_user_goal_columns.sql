ALTER TABLE user_goal
ADD COLUMN reflection_text TEXT;

ALTER TABLE user_goal
ADD COLUMN completion_date TIMESTAMPTZ;
