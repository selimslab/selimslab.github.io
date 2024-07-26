---
title: NLP
---

encoder - decoder 

text -> encoder -> embedding vectors (also called hidden state or context)

fixed length vs all encoder state 

attention 

encoder creates a series of states instead of a single hidden state. Using all the states would be a huge input for decoder. Instead, decoder assigns a different importance, weight, attention to each of encoder  states. 

This is much better but still sequential. Transformers make it parallel. 

But how? 

Self attention 

transfer learning 