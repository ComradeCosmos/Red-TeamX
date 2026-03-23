import Database from 'better-sqlite3';
import path from 'path';

// Connect to or create the SQLite database in the root of the project
const db = new Database(path.join(process.cwd(), 'data.db'));

// Initialize database table if it doesn't exist
const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT DEFAULT 'Anonymous',
      date_added DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

initDb();

export function getAllInfo() {
  const stmt = db.prepare('SELECT * FROM info ORDER BY date_added DESC');
  return stmt.all();
}

export function addInfo(title, content, author = 'Anonymous') {
  const stmt = db.prepare('INSERT INTO info (title, content, author) VALUES (?, ?, ?)');
  const result = stmt.run(title, content, author);
  return result.lastInsertRowid;
}

export default db;
