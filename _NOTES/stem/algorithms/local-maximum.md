---
---

From <https://cdixon.org/2009/09/19/climbing-the-wrong-hill>

A classic problem in computer science is hill climbing. Imagine you are dropped at a random spot on a hilly terrain, where you can only see a few feet in each direction (assume it’s foggy or something). The goal is to get to the highest hill.

![](/static/img/local_maximum.png)

Consider the simplest algorithm. At any given moment, take a step in the direction that takes you higher. The risk with this method is if you happen to start near the lower hill, you’ll end up at the top of that lower hill, not the top of the tallest hill.

A more sophisticated version of this algorithm adds some randomness to your walk. You start with a lot of randomness and reduce the amount of randomness over time.  This gives you a better chance of meandering near the bigger hill before you start your focused, non-random climb.

A better algorithm has you repeatedly drop yourself in random parts of the terrain, do simple hill climbing, and then after many such attempts step back and decide which of the hills were highest.

