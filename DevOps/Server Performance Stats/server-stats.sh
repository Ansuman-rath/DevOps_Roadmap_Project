#!/bin/bash



echo "====================================="
echo "SERVER PERFORMANCE STATS"
echo "====================================="

echo -e  "\nOS & Kernel Version:"
uname -a

echo -e "\nUptime:"
uptime -p

echo -e "\nLoad Average (1, 5, 15 min):"
uptime | awk -F'load average: ' '{ print $2 }'

echo -e "\nTotal CPU Usage:"
top -bn1 | grep "Cpu(s)" | awk '{print "Used: " $2 + $4 "%, Idle: " $8 "%"}'

echo -e "\nMemory Usage:"
free -h

echo -e "\nDisk Usage:"
df -h --total | awk '/^total/ {printf "Used: %s / %s (%s used)\n", $3, $2, $5}'

echo -e "\nTop 5 Prcoesses by CPU Usage:"
ps -eo pid,ppid,cmd,%cpu --sort=-%cpu | head -n 6  

echo -e "\nTop 5 Processes by Memory Usage:"
ps -eo pid,ppid,cmd,%mem --sort=-%mem | head -n 6

echo -e "\nLogged-in Users:"
who

echo -e  "\n====================================="
echo "Report Complete"
echo "====================================="

