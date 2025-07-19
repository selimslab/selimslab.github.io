---
---

Unicode is a standard to encode text. It assigns unique code points to characters. 

- Latin letter 'A': U+0041
- Arabic numeral '5': U+0035
- Greek letter 'α' (alpha): U+03B1
- Chinese character '汉' (han): U+6C49
- Mathematical symbol 'Σ' (sigma): U+03A3
- Emoji '😊' (smiling face with smiling eyes): U+1F60A

"U+" means it's a unicode code point in hex 

## UTF-8 

- UTF stands for Unicode Transformation Format. 
- The '8' means it uses 8-bit blocks to represent a character
- The number of blocks needed to represent a character varies from 1 to 4.
- utf8 uses just 1 byte for ASCII, and up to 4 bytes for non-ascii


|Byte 1|Byte 2|Byte 3|Byte 4|Free Bits|Max Unicode Value|
|---|---|---|---|---|---|
|0xxxxxxx||||7|2^7-1|
|110xxxxx|10xxxxxx|||(5+6)=11|2^11-1|
|1110xxxx|10xxxxxx|10xxxxxx||(4+6+6)=16|2^16-1 |
|11110xxx|10xxxxxx|10xxxxxx|10xxxxxx|(3+6+6+6)=21|2^21-1 = 1 114 111|

<https://www.fileformat.info/info/unicode/utf8.htm>


