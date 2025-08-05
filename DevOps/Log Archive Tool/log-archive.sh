#!/bin/bash
# Check if a directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <log-directory>"
  exit 1
fi

LOG_DIR="$1"

# Check if the given directory exists
if [ ! -d "$LOG_DIR" ]; then
  echo "Error: Directory '$LOG_DIR' does not exist."
  exit 1
fi

# Create archive storage directory if it doesn't exist
ARCHIVE_DIR="$HOME/log_archives"
mkdir -p "$ARCHIVE_DIR"

# Get current date and time for filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE_NAME="logs_archive_${TIMESTAMP}.tar.gz"

# Create the archive
find "$LOG_DIR" -type f -name "*.log" -readable | tar -czf "$ARCHIVE_DIR/$ARCHIVE_NAME" -T -


# Log the archive creation
LOG_FILE="$ARCHIVE_DIR/archive_log.txt"
echo "[$(date +"%Y-%m-%d %H:%M:%S")] Archived $LOG_DIR to $ARCHIVE_NAME" >> "$LOG_FILE"

# Notify user
echo "Logs archived successfully to $ARCHIVE_DIR/$ARCHIVE_NAME"






