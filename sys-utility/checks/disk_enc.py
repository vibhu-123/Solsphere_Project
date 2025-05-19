import platform, subprocess
def get_disk_encryption() -> bool:
    osn = platform.system()
    if osn == "Windows":
        out = subprocess.check_output(["manage-bde","-status"], shell=True).decode()
        return "Percentage Encrypted:  100%" in out
    if osn == "Darwin":
        out = subprocess.check_output(["fdesetup","status"]).decode()
        return "FileVault is On" in out
    # Linux: presence of crypttab entries
    with open("/etc/crypttab","r") as f:
        return any(line.strip() and not line.startswith("#") for line in f)
