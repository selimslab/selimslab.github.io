---
title: Cryptography
---

A key is a piece of information, usually a string of numbers or letters

If you use a single key, its symmetric cryptography

Public-key, or asymmetric cryptography, is a system that uses pairs of keys based on mathematical one-way functions 

---

There are two keys, one public, one private, they are a pair 

Only the private key can decrypt a message which is encrypted with its public key 

And public key can verify if a message is signed with its private key 

eg.

1. Alice and Bob shares their public keys in the open, 

Bob 
1. writes a message to Alice
2. signs it with his private key
3. encrypts it using Alice's public key and 

Alice 
1. Gets the encrypted message
2. Opens it using her private key 
3. Verifies the signature using Bob's public key 


<https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange>


## Authenticating public key owner


How do we know the public key really belongs to Alice? 

Anyone could come and claim they are Alice,

We need a mechanism to ensure that the public key really belongs to Alice  

## Certificates

In reality, you trust some entity, and it trusts others

For example, imagine you visit a website claiming to be your bank, how can you trust it?

Your browser or operating system comes with pre-configured certificate authorities (CA), they are your root certificates

1. a website shares its public key with a CA 
2. CA verifies they are the bank indeed, and signs their public key 
3. the website hands you the certificate 

Yet how do you trust this is signed by the CA indeed? 

Someone else signed the CAs public key, too

You keep checking the certificates until you reach a trusted root certificate at the bottom 

so its turtles all the way down 



## TLS

Transport layer security 

An improved and more secure version of SSL 

a standard communication method between processes is the socket

p1 -- socket -- p2 

TLS is a protocol to enable a socket to encrypt outgoing messages and decrypt the incoming


## Authentication 

Practically, the auth info provided is either 
1. something the user knows (like a password, PIN, or key)
2. something the user has (like a smart card or proof of possession of a smart phone)
3. something the user is (like the user’s fingerprint, voice, or face)

Keys are more general, passwords are more specific 

For example a million users of a website can verify the site with a single certificate, while each user have their own password 



## Authorization 

Yes they are authenticated now, yet what they are authorized to do? 

For example an OS sets different capabilities for different users 

Or a web app might have read/write permissions for each user 

Authorization levels helps managing the permissions 

