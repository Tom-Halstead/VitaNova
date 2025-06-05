ALTER TABLE entry
  ADD COLUMN activity_type   VARCHAR(50),
  ADD COLUMN duration_min    INTEGER       CHECK (duration_min >= 0),
  ADD COLUMN distance        NUMERIC(7,2)  CHECK (distance >= 0),
  ADD COLUMN distance_unit   VARCHAR(10)   DEFAULT 'mi',
  ADD COLUMN calories        INTEGER       CHECK (calories >= 0),
  ADD COLUMN location        VARCHAR(255),
  ADD COLUMN avg_heart_rate  INTEGER       CHECK (avg_heart_rate >= 0),
  ADD COLUMN max_heart_rate  INTEGER       CHECK (max_heart_rate >= 0),
  ADD COLUMN equipment       VARCHAR(100),
  ADD COLUMN notes           TEXT;
