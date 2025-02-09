export const createTablesSQL = `
    PRAGMA journal_mode = 'wal';

    -- Create user info table
    CREATE TABLE IF NOT EXISTS user_info (
        id TEXT PRIMARY KEY,
        sex TEXT NOT NULL, -- 1: Male, 2: Female
        age INTEGER NOT NULL,
        weight FLOAT NOT NULL, -- kg
        height INTEGER NOT NULL, -- cm
        goal INTEGER NOT NULL, -- 1: Lose Weight, 2: Build Muscle, 3: Improve Stamina, 4: Improve Health, 5: Stay Active
        onboarding BOOLEAN DEFAULT 0,
        createdAt TIMESTAMP DEFAULT (DATETIME('now')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('now'))
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
    
`
