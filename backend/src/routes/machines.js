import { Router } from "express";
import db from "../db.js";
const r = new Router();

r.get("/",(_,res)=>{
  db.all(`
    SELECT machine_id,
           MAX(ts) as ts,
           disk_encrypted, os_up_to_date, antivirus_ok, sleep_timeout_min
    FROM reports
    GROUP BY machine_id
  `, (err,rows)=> err ? res.status(500).send(err) : res.json(rows));
});

export default r;
