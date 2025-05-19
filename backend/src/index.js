import express from "express";
import helmet  from "helmet";
import auth    from "./middleware/auth.js";
import reportR from "./routes/report.js";
import machinesR from "./routes/machines.js";
import exportR from "./routes/export.js";

const app = express();
app.use(helmet(), express.json(), auth);

app.use("/report",   reportR);
app.use("/machines", machinesR);
app.use("/export",   exportR);

app.listen(3000,()=>console.log("Listening on http://localhost:3000"));
