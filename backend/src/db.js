import sqlite3 from "sqlite3";
const db = new sqlite3.Database("sysdata.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS reports (
    machine_id TEXT, ts INTEGER,
    disk_encrypted INTEGER,
    os_up_to_date INTEGER,
    antivirus_ok   INTEGER,
    sleep_timeout_min INTEGER
  );
`);
export default db;
