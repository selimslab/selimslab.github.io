---
---

Practically, the auth info provided is either 
1. something the user knows (like a password, PIN, or key)
2. something the user has (like a smart card or proof of possession of a smart phone)
3. something the user is (like the user’s fingerprint, voice, or face)

Keys are more general, passwords are more specific 

For example a million users of a website can verify the site with a single certificate, while each user have their own password 


## Some auth good practices

Use 2-factor  

Add exponential delay to repeated login attempts

Lock account after repeated failed login attempts 

Use authorization levels. 

Least privilege, never grant more access than required. 

Separation of privileges, so your system is not all or nothing

Use allow-lists, not block-lists 