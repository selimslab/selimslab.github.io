---
---

```python
from enum import Enum
from dataclasses import dataclass
from numbers import Number

# Base SI unit definitions
class Dimension(Enum):
    TIME = "time"
    LENGTH = "length"
    MASS = "mass"
    ELECTRIC_CURRENT = "electric current"
    TEMPERATURE = "temperature"
    AMOUNT = "amount of substance" 
    LUMINOSITY = "luminous intensity"

class UnitName(Enum):
    SECOND = "second"
    METER = "meter"
    KILOGRAM = "kilogram"
    AMPERE = "ampere"
    KELVIN = "kelvin"
    MOLE = "mole"
    CANDELA = "candela"

class Symbol(Enum):
    SECOND = "s"
    METER = "m" 
    KILOGRAM = "kg"
    AMPERE = "A"
    KELVIN = "K"
    MOLE = "mol"
    CANDELA = "cd"

@dataclass
class Unit:
    symbol: Symbol
    dimension: Dimension
    name: UnitName


# SI prefixes with powers of 10
class SIPrefix(Enum):
    FEMTO = ("f", -15, "femto")
    PICO = ("p", -12, "pico") 
    NANO = ("n", -9, "nano")
    MICRO = ("μ", -6, "micro")
    MILLI = ("m", -3, "milli")
    KILO = ("k", 3, "kilo")
    MEGA = ("M", 6, "mega")
    GIGA = ("G", 9, "giga")
    TERA = ("T", 12, "tera")
    PETA = ("P", 15, "peta")
    EXA = ("E", 18, "exa")

    def __init__(self, symbol: str, power: int, name: str):
        self.symbol = symbol
        self.power = power
        self.name = name

@dataclass
class SIScalarUnit(SIUnit):
    prefix: SIPrefix
    
    @property
    def full_symbol(self) -> str:
        return f"{self.prefix.symbol}{self.symbol.value}"

# SI Base Unit Instances
SECOND = Unit(Symbol.SECOND, Dimension.TIME, UnitName.SECOND)
METER = Unit(Symbol.METER, Dimension.LENGTH, UnitName.METER)
KILOGRAM = Unit(Symbol.KILOGRAM, Dimension.MASS, UnitName.KILOGRAM)
AMPERE = Unit(Symbol.AMPERE, Dimension.ELECTRIC_CURRENT, UnitName.AMPERE)
KELVIN = Unit(Symbol.KELVIN, Dimension.TEMPERATURE, UnitName.KELVIN)
MOLE = Unit(Symbol.MOLE, Dimension.AMOUNT, UnitName.MOLE)
CANDELA = Unit(Symbol.CANDELA, Dimension.LUMINOSITY, UnitName.CANDELA)

@dataclass
class Measurement:
    value: Number
    prefix: SIPrefix | None
    unit: Unit
    
    def __str__(self):
        if self.prefix:
            return f"{self.value} {self.prefix.name} {self.unit.symbol.value}"
        else:
            return f"{self.value} {self.unit.symbol.value}"


```