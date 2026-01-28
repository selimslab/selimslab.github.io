---
---
## tradeoffs 
```
Bias-variance: simple vs complex
accurate vs interpretable
complex vs general: simpler models generalize better 
```

## precision vs recall
precise has few false positives but misses some true ones 

high recall: more true positives but also more false ones 

F1-score: harmonic mean of both 

eg. spam detection - balance of catching more spam without marking good emails as spam 


## RL
An **agent** takes **actions** in an **environment** to maximize **reward**

Agent can use 
    its internal **state**
    its decision **policy**
    its **model** of environment etc. 

<https://lilianweng.github.io/posts/2018-02-19-rl-overview/>

## diffusion
```
training
    start with an image
    add random noise
    make the model predict how much noise is added and where

generating
    take a text prompt
    turn it into a text embedding
    start with random noise
    gradually remove noise in the direction of text embedding tensor
```
