---
title: Let's write a compiler
---

Both an interpreter and a compiler translate one language to another, normally a higher-level one to a lower-level one. 

In the end, every program must be compiled down to the assembly, CPU instructions, and finally electric pulses on transistors of logic gates

In the [[pascal-interpreter]] post, we built a mini interpreter, visiting the nodes and executing them, the flow looked like 

Source Code -> **TOKENIZER** -> tokens 
-> **PARSER** -> Abstract Syntax Tree -> **EVALUATOR** -> Executes in another language like C -> **COMPILER** -> machine code 

For a compiler, it would look like 

Source Code -> **TOKENIZER** -> tokens 
-> **PARSER** -> Abstract Syntax Tree 
-> **COMPILER** -> byte code -> **VM** -> **COMPILER for the VM language** -> **Assembler** -> machine code 

```py
from enum import Enum, auto
from dataclasses import dataclass

# Enum to represent different token types
class TokenType(Enum):
    ILLEGAL = "ILLEGAL"
    EOF = "EOF"

    # Identifiers + literals
    IDENT = "IDENT"  # add, foobar, x, y, ...
    INT = "INT"      # 1343456
    STRING = "STRING"  # "foobar"

    # Operators
    ASSIGN = "="
    PLUS = "+"
    MINUS = "-"
    BANG = "!"
    ASTERISK = "*"
    SLASH = "/"

    LT = "<"
    GT = ">"

    EQ = "=="
    NOT_EQ = "!="

    # Delimiters
    COMMA = ","
    SEMICOLON = ";"
    COLON = ":"

    LPAREN = "("
    RPAREN = ")"
    LBRACE = "{"
    RBRACE = "}"
    LBRACKET = "["
    RBRACKET = "]"

    # Keywords
    FUNCTION = "FUNCTION"
    LET = "LET"
    TRUE = "TRUE"
    FALSE = "FALSE"
    IF = "IF"
    ELSE = "ELSE"
    RETURN = "RETURN"

@dataclass
class Token:
    Type: TokenType
    Literal: str

keywords = {
    "fn": TokenType.FUNCTION,
    "let": TokenType.LET,
    "true": TokenType.TRUE,
    "false": TokenType.FALSE,
    "if": TokenType.IF,
    "else": TokenType.ELSE,
    "return": TokenType.RETURN,
}

single_char_tokens = {
    '=': TokenType.ASSIGN,
    '+': TokenType.PLUS,
    '-': TokenType.MINUS,
    '!': TokenType.BANG,
    '/': TokenType.SLASH,
    '*': TokenType.ASTERISK,
    '<': TokenType.LT,
    '>': TokenType.GT,
    ';': TokenType.SEMICOLON,
    ':': TokenType.COLON,
    ',': TokenType.COMMA,
    '{': TokenType.LBRACE,
    '}': TokenType.RBRACE,
    '(': TokenType.LPAREN,
    ')': TokenType.RPAREN,
}

def lookup_ident(ident: str) -> TokenType:
    return keywords.get(ident, TokenType.IDENT)

```

Now we have the tokens, let's define what we expect from the tokenizer

```py
from tokenizer import Tokenizer
from token import TokenType

def test_next_token():
    input_text = """
    let five = 5;
    let ten = 10;

    let add = fn(x, y) {
        x + y;
    };

    let result = add(five, ten);
    !-/*5;
    5 < 10 > 5;

    if (5 < 10) {
        return true;
    } else {
        return false;
    }

    10 == 10;
    10 != 9;
    "foobar"
    "foo bar"
    [1, 2];
    {"foo": "bar"}
    """

    tests = [
        (TokenType.LET, "let"),
        (TokenType.IDENT, "five"),
        (TokenType.ASSIGN, "="),
        (TokenType.INT, "5"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.LET, "let"),
        (TokenType.IDENT, "ten"),
        (TokenType.ASSIGN, "="),
        (TokenType.INT, "10"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.LET, "let"),
        (TokenType.IDENT, "add"),
        (TokenType.ASSIGN, "="),
        (TokenType.FUNCTION, "fn"),
        (TokenType.LPAREN, "("),
        (TokenType.IDENT, "x"),
        (TokenType.COMMA, ","),
        (TokenType.IDENT, "y"),
        (TokenType.RPAREN, ")"),
        (TokenType.LBRACE, "{"),
        (TokenType.IDENT, "x"),
        (TokenType.PLUS, "+"),
        (TokenType.IDENT, "y"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.RBRACE, "}"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.LET, "let"),
        (TokenType.IDENT, "result"),
        (TokenType.ASSIGN, "="),
        (TokenType.IDENT, "add"),
        (TokenType.LPAREN, "("),
        (TokenType.IDENT, "five"),
        (TokenType.COMMA, ","),
        (TokenType.IDENT, "ten"),
        (TokenType.RPAREN, ")"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.BANG, "!"),
        (TokenType.MINUS, "-"),
        (TokenType.SLASH, "/"),
        (TokenType.ASTERISK, "*"),
        (TokenType.INT, "5"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.INT, "5"),
        (TokenType.LT, "<"),
        (TokenType.INT, "10"),
        (TokenType.GT, ">"),
        (TokenType.INT, "5"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.IF, "if"),
        (TokenType.LPAREN, "("),
        (TokenType.INT, "5"),
        (TokenType.LT, "<"),
        (TokenType.INT, "10"),
        (TokenType.RPAREN, ")"),
        (TokenType.LBRACE, "{"),
        (TokenType.RETURN, "return"),
        (TokenType.TRUE, "true"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.RBRACE, "}"),
        (TokenType.ELSE, "else"),
        (TokenType.LBRACE, "{"),
        (TokenType.RETURN, "return"),
        (TokenType.FALSE, "false"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.RBRACE, "}"),
        (TokenType.INT, "10"),
        (TokenType.EQ, "=="),
        (TokenType.INT, "10"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.INT, "10"),
        (TokenType.NOT_EQ, "!="),
        (TokenType.INT, "9"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.STRING, "foobar"),
        (TokenType.STRING, "foo bar"),
        (TokenType.LBRACKET, "["),
        (TokenType.INT, "1"),
        (TokenType.COMMA, ","),
        (TokenType.INT, "2"),
        (TokenType.RBRACKET, "]"),
        (TokenType.SEMICOLON, ";"),
        (TokenType.LBRACE, "{"),
        (TokenType.STRING, "foo"),
        (TokenType.COLON, ":"),
        (TokenType.STRING, "bar"),
        (TokenType.RBRACE, "}"),
        (TokenType.EOF, ""),
    ]

    tokenizer = Tokenizer(input_text)

    for i, (expected_type, expected_literal) in enumerate(tests):
        tok = tokenizer.next_token()

        assert tok.type == expected_type, f"tests[{i}] - tokentype wrong. expected={expected_type}, got={tok.type}"
        assert tok.literal == expected_literal, f"tests[{i}] - literal wrong. expected={expected_literal}, got={tok.literal}"

    print("Tokenizer tests passed!")

if __name__ == "__main__":
    test_next_token()

```

Now let's implement the tokenizer 

```py

from token import Token, TokenType, single_char_tokens
from typing import Optional

class Tokenizer:
    def __init__(self, input: str):
        self.input = input
        self.position = 0
        self.read_position = 0
        self.ch: Optional[str] = None
        self.read_char()

    def __post_init__(self):
        self.read_char()

    def read_char(self):
        if self.read_position >= len(self.input):
            self.ch = None
        else:
            self.ch = self.input[self.read_position]
        self.position = self.read_position
        self.read_position += 1

    def peek_char(self):
        if self.read_position >= len(self.input):
            return None
        else:
            return self.input[self.read_position]

    def read_identifier(self):
        position = self.position
        while self.ch is not None and (self.ch.isalpha() or self.ch == '_'):
            self.read_char()
        return self.input[position:self.position]

    def read_number(self):
        position = self.position
        while self.ch is not None and self.ch.isdigit():
            self.read_char()
        return self.input[position:self.position]

    def read_string(self):
        position = self.position + 1
        while self.ch != '"' and self.ch is not None:
            self.read_char()
        return self.input[position:self.position]

    def skip_whitespace(self):
        while self.ch is not None and self.ch.isspace():
            self.read_char()


    def next_token(self):
        self.skip_whitespace()

        if self.ch is None:
            return Token(TokenType.EOF, "")

        if self.ch in single_char_tokens:
            tok_type = single_char_tokens[self.ch]
            tok_literal = self.ch
            self.read_char()
            return Token(tok_type, tok_literal)

        if self.ch == '"':
            tok_type = TokenType.STRING
            tok_literal = self.read_string()
            return Token(tok_type, tok_literal)

        if self.ch.isdigit():
            tok_type = TokenType.INT
            tok_literal = self.read_number()
            return Token(tok_type, tok_literal)

        if self.ch.isalpha() or self.ch == '_':
            tok_literal = self.read_identifier()
            tok_type = TokenType(t)
            return Token(tok_type, tok_literal)

        return Token(TokenType.ILLEGAL, self.ch)
```



Now let's define the AST, 

a program is a list of statements 

each statement is a node in AST 

```py
from token import Token, TokenType
from typing import List, Optional
from dataclasses import dataclass

# The base Node interface
@dataclass
class Node:
    def token_literal(self) -> str:
        raise NotImplementedError

    def __str__(self) -> str:
        raise NotImplementedError

# All statement nodes implement this
@dataclass
class Statement(Node):
    def token_literal(self) -> str:
        raise NotImplementedError

# All expression nodes implement this
@dataclass
class Expression(Node):
    def token_literal(self) -> str:
        raise NotImplementedError

@dataclass
class Program(Node):
    statements: List[Statement]

    def token_literal(self) -> str:
        if self.statements:
            return self.statements[0].token_literal()
        return ""

    def __str__(self) -> str:
        return "".join(str(stmt) for stmt in self.statements)

@dataclass
class LetStatement(Statement):
    token: Token
    name: Expression
    value: Expression

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return f"{self.token_literal()} {self.name} = {self.value};"

@dataclass
class ReturnStatement(Statement):
    token: Token
    return_value: Optional[Expression]

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        if self.return_value is not None:
            return f"{self.token_literal()} {self.return_value};"
        return f"{self.token_literal()};"

@dataclass
class ExpressionStatement(Statement):
    token: Token
    expression: Optional[Expression]

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        if self.expression is not None:
            return str(self.expression)
        return ""

@dataclass
class BlockStatement(Statement):
    token: Token
    statements: List[Statement]

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return "".join(str(stmt) for stmt in self.statements)

@dataclass
class Identifier(Expression):
    token: Token
    value: str

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return self.value

@dataclass
class Boolean(Expression):
    token: Token
    value: bool

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return self.token.literal

@dataclass
class IntegerLiteral(Expression):
    token: Token
    value: int

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return self.token.literal

@dataclass
class PrefixExpression(Expression):
    token: Token
    operator: str
    right: Expression

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return f"({self.operator}{self.right})"

@dataclass
class InfixExpression(Expression):
    token: Token
    left: Expression
    operator: str
    right: Expression

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return f"({self.left} {self.operator} {self.right})"

@dataclass
class IfExpression(Expression):
    token: Token
    condition: Expression
    consequence: BlockStatement
    alternative: Optional[BlockStatement]

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        result = f"if {self.condition} {self.consequence}"
        if self.alternative:
            result += f" else {self.alternative}"
        return result

@dataclass
class FunctionLiteral(Expression):
    token: Token
    parameters: List[Identifier]
    body: BlockStatement

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        params = ", ".join(str(param) for param in self.parameters)
        return f"{self.token_literal()}({params}) {self.body}"

@dataclass
class CallExpression(Expression):
    token: Token
    function: Expression
    arguments: List[Expression]

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        args = ", ".join(str(arg) for arg in self.arguments)
        return f"{self.function}({args})"

@dataclass
class StringLiteral(Expression):
    token: Token
    value: str

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return self.token.literal

@dataclass
class ArrayLiteral(Expression):
    token: Token
    elements: List[Expression]

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        elements = ", ".join(str(elem) for elem in self.elements)
        return f"[{elements}]"

@dataclass
class IndexExpression(Expression):
    token: Token
    left: Expression
    index: Expression

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        return f"({self.left}[{self.index}])"

@dataclass
class HashLiteral(Expression):
    token: Token
    pairs: Dict[Expression, Expression]

    def token_literal(self) -> str:
        return self.token.literal

    def __str__(self) -> str:
        pairs = ", ".join(f"{key}: {value}" for key, value in self.pairs.items())
        return f"{{{pairs}}}"

```

To be continued.. 