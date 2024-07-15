---
---
Unicode is a standard for consistent encoding, representation, and handling of text from various writing systems and languages around the world.

"U+" followed by a series of hexadecimal digits represents a Unicode code point. For example, "U+0041" represents the Unicode code point for the Latin letter 'A'. The "U+" prefix is used to denote that the following digits represent a Unicode code point in hexadecimal notation.

- Latin letter 'A': U+0041
- Arabic numeral '5': U+0035
- Greek letter 'α' (alpha): U+03B1
- Chinese character '汉' (han): U+6C49
- Mathematical symbol 'Σ' (sigma): U+03A3
- Emoji '😊' (smiling face with smiling eyes): U+1F60A

## UTF-8 

UTF stands for Unicode Transformation Format. The '8' means it uses 8-bit blocks to represent a character. The number of blocks needed to represent a character varies from 1 to 4.

UTF-8 is a compromise character encoding that can be as compact as ASCII (if the file is just plain English text) but can also contain any unicode characters (with some increase in file size).

One of the really nice features of UTF-8 is that it is compatible with null-terminated strings. No character will have a null (0) byte when encoded. This means that C code that deals with char[] will "just work".

**Binary format of bytes in sequence**

|1st Byte|2nd Byte|3rd Byte|4th Byte|Number of Free Bits|Maximum Expressible Unicode Value|
|---|---|---|---|---|---|
|0xxxxxxx||||7|007F hex (127)|
|110xxxxx|10xxxxxx|||(5+6)=11|07FF hex (2047)|
|1110xxxx|10xxxxxx|10xxxxxx||(4+6+6)=16|FFFF hex (65535)|
|11110xxx|10xxxxxx|10xxxxxx|10xxxxxx|(3+6+6+6)=21|10FFFF hex (1,114,111)|

https://www.fileformat.info/info/unicode/utf8.htm


