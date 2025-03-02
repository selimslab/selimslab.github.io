---
tags: stack easy

---


```python
def dailyTemperatures(temps:list):
    """
    how many days you would have to wait until a warmer temperature ? 
    """
    
    stack = []  # Stack to store indices of temperatures
    result = [0] * len(temps)  # Initialize the result list with zeros

    for current_day in range(len(temps)):
        # Check if the current day's temperature is warmer 
        # than temperatures in the stack
        while stack and temps[current_day] > temps[stack[-1]]:
            # Get the index of the previous day
            previous_day = stack.pop()  
            result[previous_day] = current_day - previous_day  

        # Push the current day's index onto the stack
        stack.append(current_day)

    return result


t = [73, 74, 75, 71, 69, 72, 76, 73]
assert dailyTemperatures(t) ==  [1, 1, 4, 2, 1, 1, 0, 0]
```
