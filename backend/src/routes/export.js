import { Router } from "express";
import createCsv from "csv-writer";
import db from "../db.js";
const r = new Router();

r.get("/",(_,res)=>{
  db.all("SELECT * FROM reports",(e,rows)=>{
    if(e) return res.status(500).send(e);
    const csv = createCsv.createObjectCsvStringifier({
      header:[
        {id:"machine_id",title:"Machine"},
        {id:"ts",title:"Timestamp"},
        {id:"disk_encrypted",title:"Encrypted"},
        {id:"os_up_to_date",title:"UpToDate"},
        {id:"antivirus_ok",title:"AV_OK"},
        {id:"sleep_timeout_min",title:"SleepMin"}
      ]
    });
    res.type("text/csv")
       .send(csv.getHeaderString()+csv.stringifyRecords(rows));
  });
});

export default r;
