---
---
When there are more than one active transaction, there is a risk that they will affect each other. Databases try to prevent this. Yet, isolation has multiple levels and there is a long list of possible concurrency bugs. Some of the key ideas are, 

Making a change visible to other transactions only when it's fully committed 

Using multiple versions of db objects. This enables a transaction to operate on an unchanging, consistent dataset. Called MVCC, multi-version concurrency control 




