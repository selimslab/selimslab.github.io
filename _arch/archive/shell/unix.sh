
# pipes 
cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -r | awk '{print , }'

---

curl -Is www.google.com | head -1
# HTTP/1.1 200 OK

---

write
SomeCommand > SomeFile.txt  

append
SomeCommand >> SomeFile.txt  

---

# device info
cat /proc/meminfo
cat /proc/cpuinfo

---

# initial setup
rsync --archive --chown=selim:selim ~/.ssh /home/selim

---


download audio 
youtube-dl --extract-audio --audio-format mp3 "url"

---

sudo -u postgres psql

CREATE USER steve WITH PASSWORD 'secret';
CREATE DATABASE testdb WITH OWNER secret;
