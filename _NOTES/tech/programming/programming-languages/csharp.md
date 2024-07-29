---
title: C# 
---

## Types 


### Value types 

byte 8 bit 

int 32 bit 

long 64 bit 

short 64 bit 

uint, ulong, ushort, sbyte

float 32 bit 

double 64 bit

decimal 128 bit 

**struct** custom value type 

char 16 bit unicode char 

### Reference types 

Object, String, Array, Class 

**Delegate** : Type-safe function pointer (e.g., `delegate void MyDelegate(string message);`)

**Interface** : Defines a contract that implementing classes must follow (e.g., `interface IShape { void Draw(); }`)



The size of primitive types is fixed by the language specification and does not change based on the machine architecture.

**Pointers and Addresses**: Pointer types (`IntPtr`, `UIntPtr`) can vary in size. For example, `IntPtr` is 32-bit on a 32-bit system and 64-bit on a 64-bit system.





```c#
using System;

class LanguageTour{
    
    static void Main(){

    }

    public static bool And(bool left, bool right) =>
    (left, right) switch
    {
        (true, true) => true,
        (_, _) => false,
    };

    public static bool Or(bool left, bool right) =>
    (left, right) switch
    {
        (false, false) => false,
        (_, _) => true,
    };
}
```



[C# docs - get started, tutorials, reference. - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/)

[Tutorial: Build algorithms with pattern matching - C# - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/pattern-matching)

[Highest scored 'c#' questions - Stack Overflow](https://stackoverflow.com/questions/tagged/c%23?tab=Votes)

[c# - Proper use of the IDisposable interface - Stack Overflow](https://stackoverflow.com/questions/538060/proper-use-of-the-idisposable-interface)