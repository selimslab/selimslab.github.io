import collections
import pprint
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Set

import pandas as pd

from .util.dict import (
    get_dict_key_with_the_max_value,
    get_dict_key_with_the_min_value,
    get_max_dict_value,
    get_min_dict_value,
)


@dataclass
class TargetStats:
    targets_seen: pd.DataFrame = field(default_factory=lambda: pd.DataFrame())

    target_updates_per_aircraft: Dict[str, int] = field(
        default_factory=lambda: collections.defaultdict(int)
    )

    number_of_aircraft_in_sample: int = 0

    aircraft_with_the_min_number_of_target_updates: Optional[str] = None
    min_number_of_target_updates: int = 0

    aircraft_with_max_number_of_target_updates: Optional[str] = None
    max_number_of_target_updates: int = 0

    def add_target(self, target: dict):
        # update stats
        self.targets_seen = self.targets_seen.append(target, ignore_index=True)

        self.target_updates_per_aircraft[target["icao_address"]] += 1

        self.number_of_aircraft_in_sample = len(self.target_updates_per_aircraft)

        self.aircraft_with_the_min_number_of_target_updates = (
            get_dict_key_with_the_min_value(self.target_updates_per_aircraft)
        )
        self.min_number_of_target_updates = get_min_dict_value(
            self.target_updates_per_aircraft
        )

        self.aircraft_with_max_number_of_target_updates = (
            get_dict_key_with_the_max_value(self.target_updates_per_aircraft)
        )
        self.max_number_of_target_updates = get_max_dict_value(
            self.target_updates_per_aircraft
        )

    def __str__(self):
        return f"""
        
Number of aircrafts in sample: {self.number_of_aircraft_in_sample}

Aircraft with max number of target updates ({self.max_number_of_target_updates}): {self.aircraft_with_max_number_of_target_updates}

Aircraft with min number of target updates ({self.min_number_of_target_updates}): {self.aircraft_with_the_min_number_of_target_updates}
            """
