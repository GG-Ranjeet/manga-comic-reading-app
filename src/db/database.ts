import * as SQLite from 'expo-sqlite';

export interface Manga {
	id: number;
	title: string;
	path: string;
	image: string;
	progress: number;
	updated_at: number;
	format: string;
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
          format TEXT NOT NULL DEFAULT 'jpg'
        );
    `);
    
    return db;
};

export const getDb = () => {
    if (!db) {
        return initDatabase();
    }
    return db;
};

export const saveManga = (title: string, path: string, image: string, progress: number = 0, format: string) => {
    const database = getDb();
	database.runSync(
		`INSERT OR REPLACE INTO manga (title, path, image, progress, updated_at, format) VALUES (?, ?, ?, ?, ?, ?)`,
		[title, path, image, progress, Date.now(), format]
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