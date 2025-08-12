
# File Integrity Checker

[File Integrity Checker](https://roadmap.sh/projects/file-integrity-checker)

A simple command-line tool to verify the integrity of log files and detect tampering by using SHA-256 hashing.

---

## Features

- Accepts a single file or a directory as input.
- Computes SHA-256 hashes for all files provided.
- Stores computed hashes securely in a JSON database.
- Compares current file hashes against stored hashes to detect modifications.
- Reports files that have been modified or are untracked.
- Allows manual re-initialization or updating of stored hashes.

---

## Requirements

- Python 3.6 or higher.

---

## Usage

Run the script with one of the following commands:

### Initialize hashes for files

```bash
python integrity_check.py init <path>
````

Computes and stores SHA-256 hashes for all files in the specified directory or for the single file.

Example:

```bash
python integrity_check.py init ./test_logs
```

### Check file integrity

```bash
python integrity_check.py check <path>
```

Compares current file hashes with stored hashes and reports any modified or untracked files.

Example:

```bash
python integrity_check.py check ./test_logs
```

### Update stored hashes

```bash
python integrity_check.py update <path>
```

Manually updates the stored hashes for specified files or directory (useful after legitimate changes).

Example:

```bash
python integrity_check.py update ./test_logs
```

---

## Hash Storage

Hashes are stored in a JSON file named `.integrity_hashes.json` located in your home directory by default:

* Linux/macOS: `/home/username/.integrity_hashes.json`
* Windows: `C:\Users\username\.integrity_hashes.json`

You can modify the script to change this path if needed.

---

## How It Works

1. On `init`, the tool scans the files, calculates SHA-256 hashes, and saves them.
2. On `check`, it recalculates current hashes and compares them against the stored values.
3. Any mismatch indicates possible tampering.
4. `update` refreshes stored hashes for files you trust after changes.

---

## Testing

You can create dummy log files for testing:

```bash
mkdir test_logs
echo "Sample log entry" > test_logs/app.log
```

Then run:

```bash
python integrity_check.py init test_logs
```

Modify files and run `check` to see if changes are detected.

---
