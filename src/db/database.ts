import * as SQLite from 'expo-sqlite';

// Open or create the local database file
export const db = SQLite.openDatabaseSync('manga_app.db');

export const initDatabase = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS manga (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      path TEXT NOT NULL,
      image TEXT NOT NULL,
      progress REAL NOT NULL DEFAULT 0,
      updated_at DATE NOT NULL,
      format TEXT NOT NULL DEFAULT 'jpg'
    );
  `);
};

export const saveManga = (title: string, path: string, image: string, progress: number = 0, format: string) => {
    db.runSync(
        `INSERT OR REPLACE INTO manga (title, path, image, progress, updated_at, format) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, path, image, progress, Date.now()]
    );
};

export const updateMangaProgress = (id: number, progress: number) => {
  db.runSync(
    `UPDATE manga SET progress = ?, updated_at = ? WHERE id = ?`,
    [progress, Date.now(), id]
  );
};

export const getAllManga = () => {
    const result = db.execSync(`SELECT * FROM manga`);
    return result;
}