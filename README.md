# 🛡️ Solsphere: System Health Monitoring Tool

Solsphere is a lightweight, cross-platform system monitoring solution. It consists of a background utility that runs on Windows, macOS, or Linux to monitor system health and report changes to a central server. Optional backend and frontend components allow administrators to collect, store, and visualize system status across multiple machines.

---

## 📌 Features

- 🔐 Checks disk encryption status
- 🖥 Verifies OS update status (current vs. latest)
- 🛡 Detects antivirus presence and activity
- 🕒 Validates inactivity sleep timeout (should be ≤ 10 mins)
- 🌀 Runs as a background service or daemon
- 📤 Sends reports only when system state changes
- 🧠 Efficient, low-resource, and secure
- 🗃 Optional backend with APIs and CSV export
- 📊 Optional dashboard for real-time monitoring

---

## 📂 Project Structure

solsphere/
├── sys-utility/ # Mandatory Python-based system monitor
├── backend/ # Optional Node.js + SQLite backend API
└── dashboard/ # Optional React-based admin dashboard

📤 Deployment
Backend can be deployed to Render, Railway, or Fly.io

Dashboard can be deployed to Vercel or Netlify

Utility can be compiled into a standalone executable using PyInstaller

🔒 Security
API access is protected with an API key

Reports are only sent when system state changes (efficient & private)

Utility runs as a daemon/service in the background with minimal resource use

🧪 Example Use Cases
IT admins monitoring laptops for encryption & antivirus compliance

Schools ensuring student devices meet sleep policy & update standards

Companies with mixed OS devices tracking basic system health
