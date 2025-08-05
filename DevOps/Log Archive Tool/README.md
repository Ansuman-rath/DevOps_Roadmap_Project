# Log Archiver Tool

A simple Bash script to archive log files from a specified directory into a compressed `.tar.gz` file. This helps in cleaning up old logs while keeping them backed up for future reference.

---

## Features

- Compresses `.log` files from any given log directory
- Saves the archive with a timestamp for easy identification
- Automatically creates an output directory if it doesn't exist
- Logs are saved in `.tar.gz` format
- Handles permission errors gracefully
- Suitable for scheduling with cron jobs

---

## Requirements

- Linux/Unix system with:
  - `bash`
  - `tar`
  - `find`
- User permissions to read log files (for full access, run as `sudo`)

---

## How to Use

```bash
chmod +x log-archive.sh
./log-archive.sh <log-directory>

