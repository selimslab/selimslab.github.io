---
title: An interpreter in Python for a subset of PASCAL
---

View step by step at <https://github.com/selimslab/mini/pascal>

Also see Peter Norvig's [(How to Write a (Lisp) Interpreter (in Python))](http://norvig.com/lispy.html)


```python
"""
Here be dragons

This is a basic interpreter 

a computer program is just text. Compilers and interpreters translate this text for the machine 

let's say our program is 2 * 7 + 3

1. First step is lexical analysis, a fancy term for tokenizing 

Lexer creates tokens [2, *, 7, +, 3]

2. Second is the syntax analysis or parsing 

Parser takes the tokens and produces and intermediate representation or IR

abstract syntax tree (AST) is a very simple IR, there are only values and operators, no metadata 

here is the AST for 2 * 7 + 3

     +
    / \
   *   3
  / \
 2   7

3. Interpreter evaluates the AST 

one way to implement an interpreter is visitor pattern and it makes it easy to add new operations later 

just visit the nodes and execute the operations


program text -> Tokenizer -> tokens -> Parser -> abstract syntax tree -> Interpreter -> result 


"""



# LEXER or Tokenizer
from enum import Enum


class TokenType(Enum):
    PLUS = '+'
    MINUS = "-"
    INTEGER = 'INTEGER'
    EOF = 'EOF'
    MUL = "*"
    DIV = "/"
    LPAREN = "("
    RPAREN = ")"



class Token:
    def __init__(self, type: TokenType, value):
        self.type = type
        self.value = value


class LexerError(Exception):
    pass


class Lexer:
    """
    The process is called lexical analysis and the part of the interpreter
    that does it is called a lexical analyzer, lexer, scanner, or tokenizer. 
    
    Here is our own lexer from the ground up without using regular expressions or any other tools like Lex.
    """
    def __init__(self, text):
        self.text = text
        self.pos = 0
        self.current_char = self.text[self.pos]

    def advance(self):
        """Advance the 'pos' pointer and set the 'current_char' variable."""
        self.pos += 1
        if self.pos > len(self.text) - 1:
            self.current_char = None  # Indicates end of input
        else:
            self.current_char = self.text[self.pos]

    def skip_whitespace(self):
        while self.current_char is not None and self.current_char.isspace():
            self.advance()

    def multidigit(self):
        """Return a (multidigit) integer consumed from the input."""
        result = ''
        while self.current_char is not None and self.current_char.isdigit():
            result += self.current_char
            self.advance()
        return result

    def get_next_token(self):
        while self.current_char is not None:

            if self.current_char.isspace():
                self.skip_whitespace()
                continue

            if self.current_char.isdigit():
                value = self.multidigit()
                return Token(TokenType.INTEGER, int(value))

            try:
                # TokenType('+') --> TokenType.PLUS
                token_type = TokenType(self.current_char)
                self.advance()
                return Token(token_type, token_type.value)
            except ValueError:
                raise

        return Token(TokenType.EOF, None)




# AST 

class ASTNode:
    pass


class BinaryOperator(ASTNode):
    def __init__(self, left, op, right):
        self.left = left
        self.token = self.op = op
        self.right = right


class Integer(ASTNode):
    def __init__(self, token):
        self.token = token
        self.value = token.value




# PARSER 

class ParserError(Exception):
    pass


class Parser:
    """
    How to recognize a phrase in the stream of tokens ? 

    Finding structure in the stream of tokens is called parsing or syntax analysis. 

    Here is the parser or syntax analyzer.
    """
    def __init__(self, tokenizer):
        self.tokenizer = tokenizer
        self.current_token = self.tokenizer.get_next_token()

    def eat(self, token_type):
        if self.current_token.type == token_type:
            self.current_token = self.tokenizer.get_next_token()
        else:
            raise ParserError(f"invalid input, {self.current_token.type, token_type}")

    def factor(self):
        """
        factor : int or (expr)
        """
        token = self.current_token

        if token.type == TokenType.INTEGER:
            self.eat(TokenType.INTEGER)
            return Integer(token)
        elif token.type == TokenType.LPAREN:
            self.eat(TokenType.LPAREN)
            node = self.expr()
            self.eat(TokenType.RPAREN)
            return node

    def term(self):
        """
        term   : factor (* or / factor)..
        """
        node = self.factor()

        while self.current_token.type in (TokenType.MUL, TokenType.DIV):
            token = self.current_token
            if token.type == TokenType.MUL:
                self.eat(TokenType.MUL)
            elif token.type == TokenType.DIV:
                self.eat(TokenType.DIV)

            node = BinaryOperator(left=node, op=token, right=self.factor())

        return node

    def expr(self):
        """
        expr   : term ( + or - term)..
        term   : factor (* or / factor)..
        factor : int or (expr)
        """
        node = self.term()

        while self.current_token.type in (TokenType.PLUS, TokenType.MINUS):
            token = self.current_token
            if token.type == TokenType.PLUS:
                self.eat(TokenType.PLUS)
            elif token.type == TokenType.MINUS:
                self.eat(TokenType.MINUS)

            node = BinaryOperator(left=node, op=token, right=self.term())

        return node

    def program(self):
        return self.expr()

    def parse(self):
        return self.program()




# INTERPRETER

class NodeVisitorError(Exception):
    pass


class InterpreterError(Exception):
    pass


class NodeVisitor:
    def visit(self, node):
        method_name = 'visit_' + type(node).__name__
        visitor = getattr(self, method_name, self.generic_visit)
        return visitor(node)

    def generic_visit(self, node):
        raise NodeVisitorError(f'No method to visit {type(node).__name__}')


class Interpreter(NodeVisitor):
    def __init__(self, parser):
        self.parser = parser

    def visit_BinaryOperator(self, node):
        left = self.visit(node.left)
        right = self.visit(node.right)
        if node.op.type == TokenType.PLUS:
            return left + right
        elif node.op.type == TokenType.MINUS:
            return left - right
        elif node.op.type == TokenType.MUL:
            return left * right
        elif node.op.type == TokenType.DIV:
            return left // right

    def visit_Integer(self, node):
        return node.value

    def eval(self, ast:ASTNode):
        return self.visit(ast)


def eval_program(program:str):
    lexer = Lexer(program)
    parser = Parser(lexer)
    ast = parser.parse()
    interpreter = Interpreter(parser)
    result = interpreter.eval(ast)
    return result


# REPL 
def repl():
    while True:
        program = input('repl> ')
        print(program)
        if program:
            try:
                result = eval_program(program)
                print(result)
            except (ParserError, LexerError, NodeVisitorError) as e:
                print(e)


def test_paspy():
    test_cases = [
        ("2+2",4),
        (" 23432 *   423 ", 9911736),
        (" (1024/16)+36*2 ", 136)

    ]
    for case, expected_answer in test_cases:
        assert eval_program(case) == expected_answer

    print("OK")


if __name__ == '__main__':
    test_paspy()
    repl()
```

