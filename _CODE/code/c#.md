---
title: C#
---

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