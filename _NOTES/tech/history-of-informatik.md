---
tags:
  - essais
  - swe
  - tech
---


Technology should be easy to understand and easy to explain because it's made from scratch by people like you and me. 

speaking 

numbers 

0 come later, 

writing 

on clay, sand, paper 

Pen and paper were enough until 100 years ago 

People knew magnets for a long time but they were of little use, later they discovered how turning a metal between magnets creates an effect, which we call electricity today. Today mostly some flowing water turns a metal between magnets and electricity flows through cables to our homes 


They were also using pen and paper to keep track of numbers and there can be a lot of them. So they designed machines to add numbers. These mechanical calculators can do a few calculations every second. This is better than doing them by pen and paper but still a bit slow for things like calculating artillery trajectory 

So people come up with a way to use electric 

mechanical switch 

Vacuum tube 

transistor 

logic gates 

memory circuit

assign numbers to each cell 

design a circuit to control memory, read this address and write to that address 

this is what we call CPU today 

represent numbers in base 2

assign numbers to the letters 

assign numbers to file types 

then print to paper 

get the input, calculate, print back, punch cards 

instructions 

machine code 

if with jump

for with if and jump 

read/write/jump is enough to be Turing-complete 

assembly 

a programming language 

keyboard 

represent pictures with numbers too 

tv screen, pixels, screen 

mouse to point things on the screen 

represent data, data structures 

sort, search, find path, algorithms 


























---

Senses send some raw information about the environment and the brain uses it to create some meaning 

Telling stories is a deep human desire.  


people were living simpler lives 


Even when people were living in caves, they were painting the walls with stories of their lives 



---



When back in the cave painting the walls, and making different sounds to explain themselves. 


---
Our tools and toys are changing but our needs are the same.  

It should be something you love and understand, as in the great Lynyrd Skynyrd song "Simple Man" 


If there is only darkness, there is nothing to distinguish between, there is no uncertainty, no information since information is the difference, between something and nothing, light and darkness, sound and silence, .. 

Senses turn the differences in air vibrations or light density to nerve signals, brain interprets the signals, and we get the feeling that we understand something. All of this is almost pure magic and we know very little about its why or how. 

So senses and brains are nature's way of processing information and the brain is still the best computer. 

Even the first people needed to keep track of a few things other and matched their fingers to objects, leading to numbers and counting. When they start growing plants and raising animals, there become many more things and people to keep track of and this led to saving numbers with knots or symbols on clay tablets. leading to letters and writing. 

Farming was a bad deal and led to a lot of work, a bland diet, more people, and more problems. Eventually to peasants, soldiers, priests, and kings. And writing enabled keeping track of all these mess. Crops, animals, soldiers, and taxes, .. 

Then came the paper and ink, scrolls and hand-written books, then printing press. Writing enabled science to rise upon the shoulders of giants, as Newton put it. Looking around and playing, people discovered the forces in nature and name them like gravity, magnetism, and electricity. 

Pen and paper goes a long way for simple calculations but they become more complicated. In 1642, Blaise Pascal invented a mechanical calculator

... 

When we do the same with computers, we call it a "program". A program takes some information and operates on it. We call a piece of information "data" and organize data in "data structures" like lists, key-value pairs, stacks, queues, trees, .. 

When you choose the right data structure for the problem, algorithms naturally flow from there. 

And we need some way to store data. The simplest thing would be to write to keep it in memory. Since a program already works with the data in memory. And if the data is in the long-term like a disk, the program first need to move it from the disk to memory to work with it. However, when the program exits or gets killed or the computer crashes, and it means all prgrams are killed, then the data in program memory is lost. So we use disks to store the data. 

---

By controlling the flow of electricity, we can represent logic. Like lightbulbs and switches.
Building something useful takes a lot of switches. Vacuum tubes and transistors. 
So these switches enable us to control how electricity will flow. We can change our input to get a desired output. 

The logic here is similar to the logic in human languages like AND OR NOT etc.. So we can create little circuits to represent the AND OR NOT operations, we call these little circuits 'logic gates' and we can build these logic gates using the switches. 

Now we have something more abstract. We don't need to think about the switches anymore. By connecting logic gates together, we can build more circuits. And what to build? 

There are many ways to represent the same information, like the same thing having different names in different languages. Or representing the same number in different number bases than the common base 10, We use base 10 since most people have 10 fingers on both hands. 

The most simple representation could be the difference between something existing or not. People have been counting things since the first people and later came up with the number 0 to represent something not existing. 

And since we are building our machine with electricity, we can represent if electricity is flowing or not with 0 and 1. And we call this one bit of information. 

If we had a way to store these, we could do useful things with that. And we can design a little circuit using the logic gate to stay electrified if we send it some current, and stay empty of we don't send anything. This is a memory bit and the building block of the memory. By connecting 8 of them together we can store 8 bits or 1 byte of data like 00010001, here we just send current to the 4th and 8th memory bits and they will stay 1 as long as the circuit is powered. When you power off the computer, the memory will also reset since it needs constant flow to keep the value. 


...

Computers execute the instructions we provide. An instruction is a simple operation like "read from this address and copy to that address"
A program is a list of instructions. A process isolates and keeps track of many pieces of information during the lifetime of a program, like the memory regions storing instructions and data, the registers and counters, ..
