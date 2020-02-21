---
layout: post
title: Some applications of ML
tags: machine-learning
--- 

## Speech recognition

https://medium.com/@ageitgey/machine-learning-is-fun-part-6-how-to-do-speech-recognition-with-deep-learning-28293c162f7a

## CNNs

https://medium.com/@ageitgey/machine-learning-is-fun-part-3-deep-learning-and-convolutional-neural-networks-f40359318721

## Face Recognition 

Histogram of Oriented Gradients(HOG)

1. picture to grayscale
2. pixels to gradients
3. Downsample gradients, 4x4 boxes to 1 gradient
4. Deal with posing using 68 landmarks and  basic image transformations like rotate, scale, shear
5. Gradients to a matrix of numbers using triplet training
6. Compare matrices