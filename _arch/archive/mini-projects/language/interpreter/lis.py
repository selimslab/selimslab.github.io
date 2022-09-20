"""
Lispy: Scheme Interpreter in Python
Peter Norvig's lis.py studied here
http://norvig.com/lispy.html
The beauty of Scheme is that the full language only needs 5 keywords and 8 syntactic forms.
In comparison, Python has 33 keywords and 110 syntactic forms,
and Java has 50 keywords and 133 syntactic forms.
program ➡ parse ➡ abstract-syntax-tree ➡ eval ➡ result
"""
import math
import operator as op
# types
Symbol = str  # A Lisp Symbol is implemented as a Python str
List = list  # A Lisp List is implemented as a Python list
Number = (int, float)  # A Lisp Number is implemented as a Python int or float
Atom = (Symbol, Number)  # A Scheme Atom is a Symbol or Number
Exp = (Atom, List)  # A Scheme expression is an Atom or List
def parse(program):
"""
    Read a Scheme expression from a string.
    The parsing component takes an input program in the form of a sequence of characters,
    verifies it according to the syntactic rules of the language,
    and translates the program into an internal representation.
    Since lispy is very simple, any expression at all was accepted as a program. It doesn't validate the syntax, it raises an
    In a simple interpreter the internal representation is a tree structure
    (often called an abstract syntax tree)
    that closely mirrors the nested structure of statements or expressions in the program.
    In a language translator called a compiler, there is often a series of internal representations,
    starting with an abstract syntax tree,
    and progressing to a sequence of instructions that can be directly executed by the computer.
    The lispy parser is implemented with the function parse.
    """
tokens = program.replace("(", " ( ").replace(")", " ) ").split()
abstract_syntax_tree = read_from_tokens(tokens)
return abstract_syntax_tree
def read_from_tokens(tokens):
"""Read an expression from a sequence of tokens."""
if len(tokens) == 0:
raise SyntaxError("unexpected EOF")
token = tokens.pop(0)
# A Scheme expression is an Atom or List
# List
if token == "(":
expr = []
while tokens[0] != ")":
expr.append(read_from_tokens(tokens))
tokens.pop(0)  # pop ')'
return expr
# Error
elif token == ")":
raise SyntaxError("unexpected )")
# Atom
else:
return atom(token)
def atom(token):
""" Numbers become numbers; every other token is a symbol."""
try:
return int(token)
except ValueError:
try:
return float(token)
except ValueError:
return Symbol(token)
class Env(dict):
"""
    An environment is a mapping from variable names to their values.
    An environment: a dict of {'var':val} pairs, with an outer Env
    This environment can be augmented with user-defined variables,
    using the expression (define symbol value)
    """
def __init__(self, params=(), args=(), outer=None):
self.update(zip(params, args))
self.outer = outer
super().__init__()
def find(self, var):
"""Find the innermost Env where var appears."""
return self if (var in self) else self.outer.find(var)
def get(self, expr):
try:
return self.find(expr)[expr]
except (AttributeError, KeyError, ValueError):
raise SyntaxError("invalid syntax")
def set(self, key, val):
self.find(key)[key] = val
def standard_env():
""" An environment with some Scheme standard procedures """
env = Env()
env.update(vars(math))  # sin, cos, sqrt, pi, ...
env.update(
        {
"+": op.add,
"-": op.sub,
"*": op.mul,
"/": op.truediv,
">": op.gt,
"<": op.lt,
">=": op.ge,
"<=": op.le,
"=": op.eq,
"abs": abs,
"append": op.add,
"begin": lambda *x: x[-1],
"car": lambda x: x[0],
"cdr": lambda x: x[1:],
"cons": lambda x, y: [x] + y,
"eq?": op.is_,
"equal?": op.eq,
"length": len,
"list": lambda *x: list(x),
"list?": lambda x: isinstance(x, list),
"map": map,
"max": max,
"min": min,
"not": op.not_,
"null?": lambda x: x == [],
"number?": lambda x: isinstance(x, Number),
"procedure?": callable,
"round": round,
"symbol?": lambda x: isinstance(x, Symbol),
        }
    )
return env
global_env = standard_env()
class Procedure(object):
"""A user-defined Scheme procedure."""
def __init__(self, params, body, env):
self.params, self.body, self.env = params, body, env
def __call__(self, *args):
return eval_lisp(self.body, Env(self.params, args, outer=self.env))
def eval_lisp(expr, env=None):
"""
    Evaluate an expression in an environment
    an expression could be one of 8
    1. variable reference
    2. constant literal
        eg. 12, -3.45e+6
    3. quotation
    (quote exp)
    Return the exp literally; do not evaluate it.
    Example: (quote (+ 1 2)) ⇒ (+ 1 2)
    4. conditional
        (if test consequence alternative)
        Evaluate test;
        if true, evaluate and return consequence;
        otherwise alternative.
        eg. (if (> 10 20) (+ 1 1) (+ 3 3)) ⇒ 6
    5. definition
        Define a new variable and give it the value of evaluating the expression exp.
        (define symbol exp)
        eg. (define r 10)
    6. assignment
    7. create procedure
        (lambda (symbol...) exp)
        (lambda (r) (* pi (* r r)))
    8. procedure call
        (proc arg...)
        If proc is anything other than one of the symbols if, define, or quote then it is treated as a procedure.
        eg. (sqrt (* 2 8))
    """
if env is None:
env = global_env
# variable reference
if isinstance(expr, Symbol):
return env.get(expr)
# constant literal
elif not isinstance(expr, List):
return expr
elif expr[0] == "quote":
# (quote exp)
        (_, exp) = expr
return exp
elif expr[0] == "if":
# (if test conseq alt)
        (_, test, conseq, alt) = expr
exp = conseq if eval_lisp(test, env) else alt
return eval_lisp(exp, env)
elif expr[0] == "define":
# (define var exp)
        (_, var, exp) = expr
env[var] = eval_lisp(exp, env)
elif expr[0] == "set!":
# (set! var exp)
        (_, key, exp) = expr
val = eval_lisp(exp, env)
env.set(key, val)
elif expr[0] == "lambda":
# (lambda (var...) body)
        (_, params, body) = expr
return Procedure(params, body, env)
else:
# (proc arg...)
proc = eval_lisp(expr[0], env)
args = [eval_lisp(exp, env) for exp in expr[1:]]
return proc(*args)
def to_string(exp):
"""Convert a Python object back into a Lisp-readable string."""
if isinstance(exp, List):
return "(" + " ".join(map(to_string, exp)) + ")"
else:
return str(exp)
def repl():
""" a read-eval-print loop """
while True:
try:
program = input("lis.py >")
abstract_syntax_tree = parse(str(program))
val = eval_lisp(abstract_syntax_tree)
if val is not None:
print(to_string(val))
except Exception as e:
print(type(e).__name__, e)
test_cases = [
    ("(quote (testing 1 (2.0) -3.14e159))", ["testing", 1, [2.0], -3.14e159]),
    ("(+ 2 2)", 4),
    ("(+ (* 2 100) (* 1 10))", 210),
    ("(if (> 6 5) (+ 1 1) (+ 2 2))", 2),
    ("(if (< 6 5) (+ 1 1) (+ 2 2))", 4),
    ("(define x 3)", None),
    ("x", 3),
    ("(+ x x)", 6),
    ("(begin (define x 1) (set! x (+ x 1)) (+ x 1))", 3),
    ("((lambda (x) (+ x x)) 5)", 10),
    ("(define twice (lambda (x) (* 2 x)))", None),
    ("(twice 5)", 10),
    ("(define compose (lambda (f g) (lambda (x) (f (g x)))))", None),
    ("((compose list twice) 5)", [10]),
    ("(define repeat (lambda (f) (compose f f)))", None),
    ("((repeat twice) 5)", 20),
    ("((repeat (repeat twice)) 5)", 80),
    ("(define fact (lambda (n) (if (<= n 1) 1 (* n (fact (- n 1))))))", None),
    ("(fact 3)", 6),
    ("(fact 50)", 30414093201713378043612608166064768844377641568960512000000000000),
    ("(define abs (lambda (n) ((if (> n 0) + -) 0 n)))", None),
    ("(list (abs -3) (abs 0) (abs 3))", [3, 0, 3]),
    (
"""(define combine (lambda (f)
    (lambda (x y)
      (if (null? x) (quote ())
          (f (list (car x) (car y))
             ((combine f) (cdr x) (cdr y)))))))""",
None,
    ),
    ("(define zip (combine cons))", None),
    ("(zip (list 1 2 3 4) (list 5 6 7 8))", [[1, 5], [2, 6], [3, 7], [4, 8]]),
    (
"""(define riff-shuffle (lambda (deck) (begin
    (define take (lambda (n seq) (if (<= n 0) (quote ()) (cons (car seq) (take (- n 1) (cdr seq))))))
    (define drop (lambda (n seq) (if (<= n 0) seq (drop (- n 1) (cdr seq)))))
    (define mid (lambda (seq) (/ (length seq) 2)))
    ((combine append) (take (mid deck) deck) (drop (mid deck) deck)))))""",
None,
    ),
    ("(riff-shuffle (list 1 2 3 4 5 6 7 8))", [1, 5, 2, 6, 3, 7, 4, 8]),
    ("((repeat riff-shuffle) (list 1 2 3 4 5 6 7 8))", [1, 3, 5, 7, 2, 4, 6, 8]),
    (
"(riff-shuffle (riff-shuffle (riff-shuffle (list 1 2 3 4 5 6 7 8))))",
        [1, 2, 3, 4, 5, 6, 7, 8],
    ),
]
def test(tests):
"""For each (exp, expected) test case, see if eval_lisp(parse(exp)) == expected."""
fails = 0
for (x, expected) in tests:
try:
result = eval_lisp(parse(x))
print("\n >", x, "\n", to_string(result))
ok = result == expected
except Exception as e:
print(x, "=raises=>", type(e), e)
ok = issubclass(expected, Exception) and isinstance(e, expected)
if not ok:
fails += 1
print("FAIL!!!  Expected", expected)
print(f"\n{fails} failed tests, out of {len(tests)}")
if __name__ == "__main__":
test(test_cases)
repl()