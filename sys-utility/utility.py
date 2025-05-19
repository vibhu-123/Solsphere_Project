#!/usr/bin/env python3
import sys, time, signal, hashlib, logging, argparse, yaml, requests
from checks.disk_enc      import get_disk_encryption
from checks.os_update     import get_os_update_status
from checks.antivirus     import get_antivirus_status
from checks.sleep_settings import get_sleep_timeout

# ─── Logging setup ─────────────────────────────────────────────────────────────
LOG = logging.getLogger("sys-utility")
LOG.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter("[%(asctime)s] %(levelname)s: %(message)s"))
LOG.addHandler(handler)

# ─── Config loader ─────────────────────────────────────────────────────────────
def load_config(path="config.yaml"):
    with open(path) as f:
        return yaml.safe_load(f)

# ─── Collect all checks ────────────────────────────────────────────────────────
def collect_state():
    return {
        "disk_encrypted":    get_disk_encryption(),
        "os_up_to_date":     get_os_update_status(),
        "antivirus_ok":      get_antivirus_status(),
        "sleep_timeout_min": get_sleep_timeout(),
    }

# ─── Send to remote API ────────────────────────────────────────────────────────
def send_report(cfg, state):
    payload = {
        "machine_id": cfg["machine_id"],
        "timestamp":  int(time.time()),
        "state":      state
    }
    headers = {"Authorization": f"Bearer {cfg['api_key']}"}
    resp = requests.post(cfg["api_url"] + "/report", json=payload, headers=headers, timeout=10)
    resp.raise_for_status()
    LOG.info("Reported state change")

# ─── Main loop ─────────────────────────────────────────────────────────────────
def run_loop(cfg):
    last_hash = None

    # Graceful shutdown
    def _stop(sig, frame):
        LOG.info("Shutting down")
        sys.exit(0)
    signal.signal(signal.SIGINT,  _stop)
    signal.signal(signal.SIGTERM, _stop)

    interval = cfg.get("interval_secs", 900)
    LOG.info(f"Monitoring every {interval}s")
    while True:
        try:
            st = collect_state()
            h = hashlib.md5(str(st).encode()).hexdigest()
            if h != last_hash:
                send_report(cfg, st)
                last_hash = h
            else:
                LOG.debug("No change")
        except Exception as e:
            LOG.error(f"Error: {e}", exc_info=True)
        time.sleep(interval)

# ─── Entrypoint ────────────────────────────────────────────────────────────────
def main():
    p = argparse.ArgumentParser()
    p.add_argument("--config", default="config.yaml")
    args = p.parse_args()

    cfg = load_config(args.config)
    for k in ("api_url","api_key","machine_id"):
        if k not in cfg:
            LOG.error(f"Missing config key: {k}")
            sys.exit(1)
    run_loop(cfg)

if __name__ == "__main__":
    main()
