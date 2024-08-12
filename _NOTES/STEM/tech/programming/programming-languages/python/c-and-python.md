---
title: Call C code from Python
---

You can use `ctypes` or `cffi` to call C code from Python.

### Using `ctypes`

1. **Create a C Library**

   ```c
   // example.c
   #include <stdio.h>

   void hello() {
       printf("Hello from C!\n");
   }
   ```

2. **Compile to Shared Library**

   ```bash
   gcc -shared -o libexample.so -fPIC example.c
   ```

3. **Use in Python**

   ```python
   import ctypes

   # Load the shared library
   lib = ctypes.CDLL('./libexample.so')

   # Call the function
   lib.hello()
   ```

### Using `cffi`

1. **Create a C Library**

   Same as above.

2. **Compile to Shared Library**

   Same as above.

3. **Use in Python**

   ```python
   from cffi import FFI

   ffi = FFI()

   # Load the shared library
   lib = ffi.dlopen('./libexample.so')

   # Define the function prototype
   ffi.cdef('void hello();')

   # Call the function
   lib.hello()
   ```