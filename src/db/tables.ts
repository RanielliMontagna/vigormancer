export const createTablesSQL = `
    PRAGMA journal_mode = 'wal';

    -- Users table
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        sex INTEGER, 
        goal INTEGER,
        birthdate DATE,
        onboarding BOOLEAN DEFAULT 0,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now'))
    );

    -- Weight history table
    CREATE TABLE IF NOT EXISTS user_weight (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        current FLOAT NOT NULL, -- kg
        heaviest FLOAT NOT NULL, -- kg
        lightest FLOAT NOT NULL, -- kg
        recordedAt TIMESTAMP DEFAULT (DATETIME('now')),
        FOREIGN KEY (userId) REFERENCES users(id)
    );

    -- Height history table
    CREATE TABLE IF NOT EXISTS user_height (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        height INTEGER NOT NULL, -- cm
        recordedAt TIMESTAMP DEFAULT (DATETIME('now')),
        FOREIGN KEY (userId) REFERENCES users(id)
    );

    -- Create workout table
    CREATE TABLE IF NOT EXISTS workouts (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        difficulty INTEGER DEFAULT 0,
        image TEXT,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now'))
    );

    -- Create category table
    CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        image TEXT,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now'))
    );

    -- Create exercise table
    CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY,
        categoryId TEXT NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        image TEXT,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now')),
        FOREIGN KEY (categoryId) REFERENCES categories(id)
    );

    -- Create workout_exercise table
    CREATE TABLE IF NOT EXISTS workout_exercise (
        id TEXT PRIMARY KEY,
        workoutId TEXT NOT NULL,
        exerciseId TEXT NOT NULL,
        sets INTEGER,
        repetitions INTEGER,
        weight INTEGER,
        rest INTEGER,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now')),
        FOREIGN KEY (workoutId) REFERENCES workouts(id),
        FOREIGN KEY (exerciseId) REFERENCES exercises(id)
    );

    CREATE TABLE IF NOT EXISTS user_streaks (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        currentStreak INTEGER DEFAULT 0,
        longestStreak INTEGER DEFAULT 0,
        lastWorkoutDate DATE,
        FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS user_workout_history (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        workoutDate DATE NOT NULL,
        exercisesCompleted INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES users(id),
        UNIQUE(userId, workoutDate) -- user can only have one workout history per day
    );

    CREATE TABLE IF NOT EXISTS user_workout_sessions (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        workoutId TEXT NOT NULL,
        startedAt TIMESTAMP DEFAULT (DATETIME('now')),
        finishedAt TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (workoutId) REFERENCES workouts(id)
    );

    CREATE TABLE IF NOT EXISTS user_workout_exercises (
        id TEXT PRIMARY KEY,
        sessionId TEXT NOT NULL,
        exerciseId INTEGER NOT NULL,
        exerciseName TEXT NOT NULL,
        sets INTEGER NOT NULL,
        repetitions INTEGER NOT NULL,
        weight FLOAT, -- kg
        FOREIGN KEY (sessionId) REFERENCES user_workout_sessions(id),
        FOREIGN KEY (exerciseId) REFERENCES exercises(id)
    );
`
