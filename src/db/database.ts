import * as SQLite from 'expo-sqlite';

export interface Manga {
    id: number;
    title: string;
    path: string;
    image: string;
    progress: number;
    updated_at: number;
    format: string;
    totalPages: number; // Optional property for total pages
}

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = () => {
    if (db) return db;
    // Open or create the local database file
    db = SQLite.openDatabaseSync('manga_app.db');

    db.execSync(`
        CREATE TABLE IF NOT EXISTS manga (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT UNIQUE NOT NULL,
          path TEXT NOT NULL,
          image TEXT NOT NULL,
          progress REAL NOT NULL DEFAULT 0,
          updated_at DATE NOT NULL,
          format TEXT NOT NULL DEFAULT 'jpg',
          totalPages INTEGER NOT NULL
        );
    `);
    try {
        db.execSync(`ALTER TABLE manga ADD COLUMN totalPages INTEGER NOT NULL DEFAULT 0;`);
    } catch (error) {
        // Column already exists; safe to ignore
    }

    return db;
};

export const getDb = () => {
    if (!db) {
        return initDatabase();
    }
    return db;
};

export const saveManga = (title: string, path: string, image: string, progress: number = 0, format: string, totalPages: number) => {
    const database = getDb();
    database.runSync(
        `INSERT OR REPLACE INTO manga (title, path, image, progress, updated_at, format, totalPages) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, path, image, progress, Date.now(), format, totalPages]
    );
    console.log("Manga saved:", { title, path, image, progress, format });
};

export const updateMangaProgress = (id: number, progress: number) => {
    const database = getDb();
    database.runSync(
        `UPDATE manga SET progress = ?, updated_at = ? WHERE id = ?`,
        [progress, Date.now(), id]
    );
};

export const getAllManga = (): Manga[] => {
    const database = getDb();
    const result = database.getAllSync<Manga>(`SELECT * FROM manga`);
    return result;
};

export const getMangaById = (id: number): Manga | null => {
    const database = getDb();
    const result = database.getFirstSync<Manga>(`SELECT * FROM manga WHERE id = ?`, [id]);
    return result || null;
}