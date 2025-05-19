import platform, subprocess, re
def get_sleep_timeout() -> int:
    osn = platform.system()
    if osn == "Windows":
        out = subprocess.check_output(["powercfg","/q"], shell=True).decode()
        # stub: parse GUID → minutes
        return 10
    if osn == "Darwin":
        out = subprocess.check_output(["pmset","-g"]).decode()
        m = re.search(r"sleep\s+(\d+)", out)
        return int(m.group(1)) if m else 0
    out = subprocess.check_output(["xset","q"]).decode()
    m = re.search(r"timeout:\s+(\d+)", out)
    return int(m.group(1))//60 if m else 0
