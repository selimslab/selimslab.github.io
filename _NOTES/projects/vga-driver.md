---
title: VGA Driver
layout: code
---

It's for a game similar to Doodle Jump,
 
Tried on ARM Cortex A9 microcontroller

We will need some routines to draw boxes, display text etc. 

```c
/****************************************************************************************
 * Subroutine to send a string of text to the VGA monitor 
 ****************************************************************************************/
void VGA_text(int x, int y, char * text_ptr) {
  int offset;
  volatile char * character_buffer = (char * ) FPGA_CHAR_BASE; // VGA character buffer

  /* assume that the text string fits on one line */
  offset = (y << 7) + x;
  while ( * (text_ptr)) {
    *(character_buffer + offset) = * (text_ptr); // write to the character buffer
    ++text_ptr;
    ++offset;
  }
}

/****************************************************************************************
 * Draw a filled rectangle on the VGA monitor 
 ****************************************************************************************/
void VGA_box(int x1, int y1, int x2, int y2, short pixel_color) {
  int pixel_ptr, row, col;

  /* assume that the box coordinates are valid */
  for (row = y1; row <= y2; row++)
    for (col = x1; col <= x2; ++col) {
      pixel_ptr = FPGA_ONCHIP_BASE + (row << 10) + (col << 1);
      *(short * ) pixel_ptr = pixel_color; // set pixel color
    }
}

/****************************************************************************************
 * Subroutine to show a string of HEX data on the HEX displays
 ****************************************************************************************/
void HEX_PS2(char b1, char b2, char b3) {
  volatile int * HEX3_HEX0_ptr = (int * ) HEX3_HEX0_BASE;
  volatile int * HEX5_HEX4_ptr = (int * ) HEX5_HEX4_BASE;

  /* SEVEN_SEGMENT_DECODE_TABLE gives the on/off settings for all segments in 
   * a single 7-seg display in the DE1-SoC Computer, for the hex digits 0 - F */
  unsigned char seven_seg_decode_table[] = {
    0x3F,
    0x06,
    0x5B,
    0x4F,
    0x66,
    0x6D,
    0x7C,
    0x07,
    0x7F,
    0x67,
    0x77,
    0x7C,
    0x39,
    0x5E,
    0x79,
    0x71
  };
  unsigned char hex_segs[] = {
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  };
  unsigned int shift_buffer, nibble;
  unsigned char code;
  int i;

  shift_buffer = (b1 << 16) | (b2 << 8) | b3;
  for (i = 0; i < 6; ++i) {
    nibble = shift_buffer & 0x0000000F; // character is in rightmost nibble
    code = seven_seg_decode_table[nibble];
    hex_segs[i] = code;
    shift_buffer = shift_buffer >> 4;
  }
  /* drive the hex displays */
  *(HEX3_HEX0_ptr) = * (int * )(hex_segs);
  *(HEX5_HEX4_ptr) = * (int * )(hex_segs + 4);
}

int resample_rgb(int num_bits, int color) {
  if (num_bits == 8) {
    color = (((color >> 16) & 0x000000E0) | ((color >> 11) & 0x0000001C) |
      ((color >> 6) & 0x00000003));
    color = (color << 8) | color;
  } else if (num_bits == 16) {
    color = (((color >> 8) & 0x0000F800) | ((color >> 5) & 0x000007E0) |
      ((color >> 3) & 0x0000001F));
  }
  return color;
}
```

