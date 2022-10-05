---
tags: array
---

[[array]]

```java
/*
left rotate a size n array by d  

5 4
1 2 3 4 5

5 1 2 3 4

*/

import java.io.*;
import java.util.*;
import java.math.*;


public class LeftRotation {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();
        int d = scan.nextInt();
        int[] array = new int[n];
        for(int i=0; i<n;i++) {
            array[(i+n-d)%n] = scan.nextInt();
        }
        for(int i=0; i<n;i++) {
            System.out.print(array[i] + " ");
        }      
    }
}
```


```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        reverse(matrix.begin(), matrix.end());
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = i + 1; j < matrix[i].size(); j++){
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        
    }
};
```
