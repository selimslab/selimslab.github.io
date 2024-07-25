---
title: C# 
---
[C# docs - get started, tutorials, reference. - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/)

[Tutorial: Build algorithms with pattern matching - C# - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/pattern-matching)

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


[Highest scored 'c#' questions - Stack Overflow](https://stackoverflow.com/questions/tagged/c%23?tab=Votes)

[c# - Proper use of the IDisposable interface - Stack Overflow](https://stackoverflow.com/questions/538060/proper-use-of-the-idisposable-interface)