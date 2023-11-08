---
---


```py

from enum import Enum
from dataclasses import dataclass

class Symbol(Enum):
    S = "s"
    M = "m"
    KG = "kg"
    A = "A"
    K = "K"
    MOL = "mol"
    CD = "cd"

class UnitName(Enum):
    SECOND = "second"
    METER = "meter"
    KILOGRAM = "kilogram"
    AMPERE = "ampere"
    KELVIN = "kelvin"
    MOLE = "mole"
    CANDELA = "candela"

class Dimension(Enum):
    TIME = "time"
    LENGTH = "length"
    MASS = "mass"
    ELECTRIC_CURRENT = "electric current"
    THERMODYNAMIC_TEMPERATURE = "thermodynamic temperature"
    AMOUNT_OF_SUBSTANCE = "amount of substance"
    LUMINOUS_INTENSITY = "luminous intensity"

@dataclass
class Unit:
    symbol: Symbol
    name: UnitName
    dimension: Dimension

@dataclass
class SIUnit(Unit):
    ... 


second = SIUnit(Symbol.S, UnitName.SECOND, Dimension.TIME)
meter = SIUnit(Symbol.M, UnitName.METER, Dimension.LENGTH)
kilogram = SIUnit(Symbol.KG, UnitName.KILOGRAM, Dimension.MASS)
ampere = SIUnit(Symbol.A, UnitName.AMPERE, Dimension.ELECTRIC_CURRENT)
kelvin = SIUnit(Symbol.K, UnitName.KELVIN, Dimension.THERMODYNAMIC_TEMPERATURE)
mole = SIUnit(Symbol.MOL, UnitName.MOLE, Dimension.AMOUNT_OF_SUBSTANCE)
candela = SIUnit(Symbol.CD, UnitName.CANDELA, Dimension.LUMINOUS_INTENSITY)

print(second)  # Output: SIUnit(symbol=<Symbol.S: 's'>, unit_name=<UnitName.SECOND: 'second'>, dimension=<Dimension.TIME: 'time'>)



Sure! The SI prefixes represent powers of 10 that are used to form decimal multiples and submultiples of SI units. Here's how you can define SI prefixes from pico (10^-12) to exa (10^18) using enums in Python:

python
Copy code
from enum import Enum

class SIPrefix(Enum):
    PICO = "p"  # 10^-12
    NANO = "n"  # 10^-9
    MICRO = "µ"  # 10^-6 (mu symbol)
    MILLI = "m"  # 10^-3
    CENTI = "c"  # 10^-2
    DECI = "d"   # 10^-1
    DECA = "da"   # 10^1
    HECTO = "h"  # 10^2
    KILO = "k"   # 10^3
    MEGA = "M"   # 10^6
    GIGA = "G"   # 10^9
    TERA = "T"   # 10^12
    PETA = "P"   # 10^15
    EXA = "E"    # 10^18


@dataclass
class SIScalarUnit(SIUnit):
    prefix: SIPrefix

millimeter = SIScalarUnit(Symbol.M, UnitName.METER, Dimension.LENGTH, SIPrefix.MILLI)

from numbers import Number

class Measurement:
    unit: Unit 
    quantity: Number


```