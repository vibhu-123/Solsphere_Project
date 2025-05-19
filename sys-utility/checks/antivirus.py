import platform, subprocess
def get_antivirus_status() -> bool:
    osn = platform.system()
    if osn == "Windows":
        return True  # stub; implement WSC COM query
    for d in ("clamd","sophosd","sav-protect"):
        try:
            subprocess.check_output(["pidof", d])
            return True
        except subprocess.CalledProcessError:
            continue
    return False
