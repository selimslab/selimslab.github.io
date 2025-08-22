---
---
## race condition types
outcome depends on timing/order

- data race: shared access w/o sync, at least one write
- critical section, init, destroy
- read-modify-write: non-atomic op with multiple instructions
- ABA: value changes and back, appearing unchanged
