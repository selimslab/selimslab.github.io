---
tags: stack

---


```python
def dailyTemperatures(T):
    """
    how many days you would have to wait until a warmer temperature ? 
    """
    
    stack = []  # Stack to store indices of temperatures
    result = [0] * len(T)  # Initialize the result list with zeros

    for current_day in range(len(T)):
        # Check if the current day's temperature is warmer 
        # than temperatures in the stack
        while stack and T[current_day] > T[stack[-1]]:
            previous_day = stack.pop()  # Get the index of the previous day
            result[previous_day] = current_day - previous_day  # Update the result

        # Push the current day's index onto the stack
        stack.append(current_day)

    return result


t = [73, 74, 75, 71, 69, 72, 76, 73]
assert dailyTemperatures(t) ==  [1, 1, 4, 2, 1, 1, 0, 0]
```
