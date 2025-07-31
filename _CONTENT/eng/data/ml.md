---
title: Machine Learning
---


## deep learning 

A network is layers of weights. 

It gets a list of numbers, outputs a number

For each training pass  
- Multiply input tensor with weights and add bias, layer by layer  
- Compare prediction to correct answer using a loss function  
- Find gradients using backprop. Minimize loss via gradient descent 

```
For a 3-layer network 

1. Forward pass 

Input → Layer1 → Layer2 → Layer3 → Output → Loss

x = input data 
l1 = activation_func(W1.x + b1) 
l2 = activation_func(W2.x + b2)
l3 = ..
output = W3.l3 + b4

loss = loss_func(output, correct_answer)

2. Backprop 

Update weights using chain rule 

Loss → Layer3 → Layer2 → Layer1 → Input

d_loss/d3
d_loss/d2 = d_loss/d3 . d2/d3
d_loss/d1 = d_loss/d2 . d2/d1
d_loss/input = d_loss/d1 . d1/input

W = W - learning_rate.d_loss/dW
```


## diffusion 

When training, start with an image, add random noise, and make the model predict how much noise is added and where 

When generating, take a text prompt, turn it into a text embedding, start with random noise, gradually remove noise

For example, to generate an apple image,
- start with random noise
- remove some noise in the direction of text embedding tensor


## tradeoffs 

Bias-variance: simplicity vs complexity 

accurate vs interpretable

complexity vs generality: simpler models generalize better 

precision vs recall: 
- precise has few false positives but misses some true ones 
- high recall: more true positives but also more false ones 

F1-score: harmonic mean of both 

eg. spam detection - balance of catching more spam without marking good emails as spam 


## RL

RL is based on trial and error

An **agent** takes **actions** in an **environment** to maximize **reward** 

Agent can use its internal **state**, its decision **policy**, its **model** of environment, etc. to choose its next action

<https://lilianweng.github.io/posts/2018-02-19-rl-overview/>
