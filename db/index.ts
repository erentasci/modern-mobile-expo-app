import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

export const DATABASE_NAME = 'tasks';
const expoDb = openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expoDb);

export const initDB = () => {
  expoDb.execSync(`
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      status TEXT DEFAULT 'pending',
      priority TEXT DEFAULT 'medium',
      is_completed INTEGER DEFAULT 0,
      due_date TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      list_id INTEGER NOT NULL,
      FOREIGN KEY (list_id) REFERENCES lists(id)
    );
  `);
};
