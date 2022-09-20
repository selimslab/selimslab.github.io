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