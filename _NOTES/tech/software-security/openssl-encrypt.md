---
title: How to encrypt-decrypt a file with a password  

---

openssl comes pre-installed on Mac OS

```bash
# encrypt file.txt to file.enc using 256-bit AES in CBC mode
openssl enc -aes-256-cbc -salt -in file.txt -out file.enc

# the same, only the output is base64 encoded for, e.g., e-mail
openssl enc -aes-256-cbc -a -salt -in file.txt -out file.enc

# decrypt binary file.enc
openssl enc -d -aes-256-cbc -in file.enc -out file.txt

# decrypt base64-encoded version
openssl enc -d -aes-256-cbc -a -in file.enc -out file.txt
```

256-bit AES ecryption with Cipher Block Chaining (CBC) is about as secure as it gets

from <https://superuser.com/a/370412>