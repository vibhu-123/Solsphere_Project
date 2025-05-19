import { Router } from "express";
import db from "../db.js";
const r = new Router();

r.post("/",(req,res)=>{
  const { machine_id, timestamp, state } = req.body;
  db.run(
    `INSERT INTO reports VALUES (?,?,?,?,?,?)`,
    [machine_id,timestamp,
     +state.disk_encrypted,
     +state.os_up_to_date,
     +state.antivirus_ok,
     state.sleep_timeout_min],
    err => err ? res.status(500).send(err) : res.sendStatus(204)
  );
});

export default r;
