#!/bin/bash

LOG_FILE=$1

if [[ ! -f "$LOG_FILE" ]]; then
	echo "Usage: $0 <nginx_access_log_files>"
	exit 1
fi

echo "-----------------------------"
echo "Analyzing log file: $LOG_FILE"
echo "-----------------------------"

echo -e "\nTop 5 IP adresses with most requests:"
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -n 5 | awk '{printf "IP - %-30s Requests - %s\n", $2, $1}'

echo -e "\nTop 5 requested paths:"
awk -F\" '{print $2}' "$LOG_FILE" | awk '{print $2}' | sort | uniq -c | sort -nr | head -n 5 | awk '{printf "Path - %-30s Requests - %s\n", $2,$1}'

echo -e "\nTop 5 response status codes:"
awk '{ print $9 }' "$LOG_FILE" | sort | uniq -c | sort -nr | head -n 5 | awk '{printf "Status Code - %-30s Responses - %s\n", $2, $1}'

echo -e "\nTop 5 user agents:"
awk -F\" '{print $6}' "$LOG_FILE" | sort |uniq -c | sort -nr | head -n 5 | awk '{printf "User Agent - %-30s Count - %s\n", $2, $1}'


echo -e "\n-----------------------------"
echo "Complete"
echo "-----------------------------"

