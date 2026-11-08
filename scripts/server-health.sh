#!/usr/bin/env bash
# Read-only Linux snapshot. No restarts, package installation, privilege escalation or environment dump.
set -u
export LC_ALL=C
printf '\n=== UTC / uptime / logical CPUs ===\n'
date -u
uptime
getconf _NPROCESSORS_ONLN
printf '\n=== Memory (watch available, not just free) ===\n'
free -h
printf '\n=== Filesystem capacity / inodes ===\n'
df -h . /tmp
df -i . /tmp
printf '\n=== Largest resident processes (RSS in KiB; commands exclude arguments) ===\n'
ps -eo pid,comm,pcpu,pmem,rss --sort=-rss | head -16
printf '\n=== CPU / run queue / swap / IO wait (ignore first aggregate row) ===\n'
if command -v vmstat >/dev/null 2>&1; then vmstat 1 5; else printf 'vmstat not installed\n'; fi
printf '\n=== cgroup v2 container limits, if applicable ===\n'
for name in memory.max memory.current memory.events cpu.max cpu.stat; do
  if [ -r "/sys/fs/cgroup/$name" ]; then printf '\n%s\n' "$name"; cat "/sys/fs/cgroup/$name"; fi
done
printf '\nRead-only snapshot complete. Repeat during a slow request. Redact hostnames/process names before sharing.\n'
