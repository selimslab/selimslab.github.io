---
---

A password should be secure even if the database is compromised. So we store a derived value instead. The result of a one-way function. And we call this a hash function. 

password -> HASH FUNCTION -> hash of the password

This is good but can be better. Hash functions are not secret. An attacker can pre-compute hashes for common passwords, create a table, and compare with them. Called rainbow tables. 

But if we add a random part to the password, the hash will be unique. This random part is called a salt. 

password + salt -> HASH FUNCTION -> hash of the password

Now it's safe to store the salt and the hash instead of the password. 

get pass, salt it, hash it, compare with the stored hash


