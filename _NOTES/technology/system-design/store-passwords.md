---
title: How to store passwords?
tags: sys sec
---

A password should be secure even if the database is compromised. So we store a derived value instead. The result of a one-way function. And we call this a **hash** function. 

password -> HASH FUNCTION -> hash of the password

This is good but can be better. Hash functions are not secret. An attacker can pre-compute hashes for common passwords, create a table, and compare with them. Rainbow tables are of similar logic. 

But if we add a random part to the password, the hash will be unique. This random part is called a salt. 

password + salt -> HASH FUNCTION -> hash of the password

Now it's safe to store the salt and the hash instead of the password. 

When a user provides their password, authentication logic can salt it, hash it, and compare the result with the stored hash. 


