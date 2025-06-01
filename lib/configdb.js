const Database = require('better-sqlite3');
const path = require('path');
const config = require('../config');
const { setAnti, getAnti } = require('../data/antidel');

const db = new Database(path.join(__dirname, 'botdata.db'));

db.prepare(`
  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`).run();

function getConfig(key) {
  const row = db.prepare("SELECT value FROM config WHERE key = ?").get(key);

  if (key === "ANTI_DEL_PATH" && !row) {
    if (config.ANTI_DELETE === "true") {
      // ✅ Insert default log mode only if not exists
      setConfig("ANTI_DEL_PATH", "log");
      setAnti("gc", true);
      setAnti("dm", true);
      return "log";
    }
    return "same";
  }

  return row ? row.value : null;
}

function setConfig(key, value) {
  db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)").run(key, value);
}

function getAllConfig() {
  const rows = db.prepare("SELECT * FROM config").all();
  return Object.fromEntries(rows.map(row => [row.key, row.value]));
}

module.exports = {
  getConfig,
  setConfig,
  getAllConfig,
};