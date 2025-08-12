import os
import sys
import hashlib
import json

HASH_DB = os.path.expanduser("~/.integrity_hashes.json")

def compute_hash(filepath):
    sha256 = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return sha256.hexdigest()

def load_hash_db():
    if not os.path.exists(HASH_DB):
        return {}
    with open(HASH_DB, "r") as f:
        return json.load(f)

def save_hash_db(db):
    with open(HASH_DB, "w") as f:
        json.dump(db, f, indent=4)

def get_log_files(path):
    if os.path.isfile(path):
        return [path]
    files = []
    for root, _, filenames in os.walk(path):
        for file in filenames:
            # Optional: only consider .log files, or all files
            if file.endswith(".log") or True:
                files.append(os.path.join(root, file))
    return files

def init(path):
    files = get_log_files(path)
    db = {}
    for file in files:
        try:
            db[file] = compute_hash(file)
        except Exception as e:
            print(f"Failed to hash {file}: {e}")
    save_hash_db(db)
    print("Hashes stored successfully.")

def check(path):
    files = get_log_files(path)
    db = load_hash_db()
    modified = []
    untracked = []
    for file in files:
        try:
            current_hash = compute_hash(file)
        except Exception as e:
            print(f"Failed to hash {file}: {e}")
            continue
        if file not in db:
            untracked.append(file)
        elif db[file] != current_hash:
            modified.append(file)
    for file in modified:
        print(f"{file}: Status: Modified (Hash mismatch)")
    for file in untracked:
        print(f"{file}: Status: Untracked (No stored hash)")
    if not modified and not untracked:
        print("Status: Unmodified")

def update(path):
    files = get_log_files(path)
    db = load_hash_db()
    updated = []
    for file in files:
        try:
            current_hash = compute_hash(file)
        except Exception as e:
            print(f"Failed to hash {file}: {e}")
            continue
        db[file] = current_hash
        updated.append(file)
    save_hash_db(db)
    print(f"Hash updated successfully for {len(updated)} file(s).")

def usage():
    print("Usage:")
    print("  integrity-check init <path>     # Initialize and store hashes")
    print("  integrity-check check <path>    # Check integrity against stored hashes")
    print("  integrity-check update <path>   # Update stored hashes (manual re-init)")

def main():
    if len(sys.argv) < 3:
        usage()
        sys.exit(1)
    command = sys.argv[1].lower()
    path = sys.argv[2]
    if not os.path.exists(path):
        print(f"Error: Path {path} does not exist.")
        sys.exit(1)

    if command == "init":
        init(path)
    elif command == "check":
        check(path)
    elif command == "update":
        update(path)
    else:
        usage()

if __name__ == "__main__":
    main()
