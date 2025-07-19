---
---

When training, start with an image, add random noise, and make the model predict how much noise is added and where 

When generating, take a text prompt, turn it into a text embedding, start with random noise, gradually remove noise


For example, to generate an apple image,
- start with random noise
- remove some noise in the direction of text embedding tensor
