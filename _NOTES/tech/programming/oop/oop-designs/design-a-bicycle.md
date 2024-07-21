---
---

```py

from units import Measurement 

class Frame:
    ... 

class Stem:
    length: Measurement 

class Fork:
    ... 

class Handlebar:
    ... 

class Flatbar(Handlebar):
    ...

class Dropbar(Handlebar):
    ...

class Tube:
    ... 

class Tyre:
    ... 

class Wheel:
    diameter: Measurement
    tube: Optional[Tube]
    tyre: Optional[Tyre]

class Wheelset: 
    front: Wheel
    rear: Wheel 

class Pedal:
    ...

Pedalset = tuple(Pedal, Pedal)

class GearSystem:
    ... 

class BrakeSystem:
    ...

class DiscBrakeSystem(BrakeSystem):
    ...

class HydraulicDiscBrake(DiscBrakeSystem):
    ...

class MechanicalDiscBrake(DiscBrakeSystem):
    ...

class RimBrake(BrakeSystem):
    ...

class SuspensionSystem:
    ... 
    
class Seat:
    ... 

class Bicycle:
    frame: Frame
    stem: Stem
    fork: Fork
    handlebar: Handlebar
    wheelset: Wheelset
    brakes: BrakeSystem
    pedals: Optional[Pedalset]
    suspension: Optional[SuspensionSystem]
    seat: Optional[Seat] 

    def pedal():
        ... 

    def brake():
        ... 

    def turn():
        ... 

class RoadBike(Bicycle):
    ... 

class GravelBike(Bicycle):
    ...

class MountainBike(Bicycle):
    ...

class CityBike(Bicycle):
    ...

class HybridBike(Bicycle):
    ...

class EBike(Bicycle):
    ...

class Cyclist(Human):
    def cycle(bike:Bicycle):
        ... 
    
```