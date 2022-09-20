"""

# exprassemble

Generate 8086 code for a given infix expression 

It creates .asm yet it can't print the output 
## Steps

Implemented with stack based algorithm, pseudocode from [cs.arizona.edu](https://www2.cs.arizona.edu/classes/cs127b/fall15/infix.pdf)

1. Read infix expression
2. Tokenize 
3. Infix to postfix
4. Postfix to assembly 
5. Write output 

## Requirements

python3 


## Run 

`python3 exprassemble.py input_file_name`

the output will be in out.asm 

## Assumptions

- The expression is hexadecimal
- It uses +, *, / operations and parantheses
- Given infix expressions are valid. Invalid expressions will raise an exception and print an error log 
- All values and results of operations will fit into 16 bits
"""


import os
import io
import sys
import tokenize
import logging 
from typing import List
from enum import Enum
from tokenize import STRING, NUMBER, NAME, OP, NEWLINE, ENDMARKER, TokenInfo, TokenError

logging.basicConfig()
logging.root.setLevel(logging.INFO)

class Symbol:
    LPAREN = "("
    RPAREN = ")"
    PLUS = "+"
    MUL = "*"
    DIV = "/"


class Op:
    ADD = "ADD"
    MUL = "MUL"
    DIV = "DIV"
    PUSH = "PUSH"


def infix_to_postfix(tokens: list) -> str:
    priority = {Symbol.PLUS: 1, Symbol.MUL: 2, Symbol.DIV: 2}

    postfix = ""
    stack = []

    for token in tokens:
        c = token.string
        if token.type is NAME or token.type is NUMBER:
            postfix += c
        elif token.type is OP:
            if c is Symbol.LPAREN:
                stack.append(c)
            elif c is Symbol.RPAREN:
                operator = stack.pop()
                # pop until a left paren
                while operator is not Symbol.LPAREN:
                    postfix += operator
                    if not stack:
                        break
                    operator = stack.pop()
            else:
                # pop operators with greater or equal priority
                # is there a higher priority element in stack
                while stack and priority.get(stack[-1], -1) >= priority.get(c, 0):
                    postfix += stack.pop()
                # push the token 
                stack.append(c)

    # pop remaining 
    while stack:
        postfix += stack.pop()

    return postfix


def postfix_to_assembly(postfix: str) -> str:
    operators = {Symbol.PLUS: Op.ADD, Symbol.MUL: Op.MUL, Symbol.DIV: Op.DIV}

    asm_lines = []
    start = f"""
section .text

global _start

_start:
    """
    asm_lines.append(start)

    for c in postfix:
        if c in operators:
            operation = operators.get(c)
            s = f"""
POP CX
POP AX  
{operation} CX
PUSH AX
            """
        else:
            s = f"""
                {Op.PUSH} 0{c}h
            """
        asm_lines.append(s)


    asm_lines.append("INT 20h")
    asm_lines = [s.strip() for s in asm_lines]
    asm: str = "\n\n".join(asm_lines)
    return asm


def get_input_file() -> str:
    if len(sys.argv) == 1:
        raise Exception("please provide input file")

    return sys.argv[1]


def write_asm(asm: str, out_file) -> None:
    with open(out_file, "w") as f:
        f.write(asm)
    print("out.asm generated.")


def token_generator_from_file(input_file: str):
    with tokenize.open(input_file) as f:
        try:
            tokens = tokenize.generate_tokens(f.readline)
            for token in tokens:
                yield token
        except TokenError as e:
            logging.error(e)


def token_generator_from_string(s: str):
    buf = io.StringIO(s)
    try:
        tokens = tokenize.generate_tokens(buf.readline)
        for token in tokens:
            yield token
    except TokenError as e:
        logging.error(e)

def get_tokens_by_line(input_file) -> List[list]:
    tokens_for_lines = []
    tokens: List[TokenInfo] = []
    for token in token_generator_from_file(input_file):
        if token.type in {NEWLINE, ENDMARKER}:
            if tokens:
                tokens_for_lines.append(tokens)
            tokens = []
        else:
            tokens.append(token)

    return tokens_for_lines


def main():
    input_file = get_input_file()
    output_file = "out.asm"
    tokens_for_lines = get_tokens_by_line(input_file)
    for tokens in tokens_for_lines:
        postfix = infix_to_postfix(tokens)
        print(postfix)
        asm = postfix_to_assembly(postfix)
        write_asm(asm, output_file)
        print()


def test_infix_to_postfix():
    test_cases = [
        ("2*(b+1)/2", "2b1+*2/"),
        ("(2*a)+b+(3/b)", "2a*b+3b/+"),
        ("(a+b/2)/(a+e*c+f)", "ab2/+aec*+f+/"),
    ]
    success = 0
    for case in test_cases:
        given, expected = case
        tokens = list(token_generator_from_string(given))
        postfix = infix_to_postfix(tokens)
        try:
            assert postfix == expected
            success += 1
        except AssertionError as e:
            print(e)
            print("expected", expected, "got", postfix)

    if success == len(test_cases):
        print("all tests pass")


if __name__ == "__main__":
    test_infix_to_postfix()
    main()
