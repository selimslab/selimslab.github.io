def readBinaryWatch(self, num: int) -> List[str]:
    """
    Given a non-negative integer n which represents the number of LEDs that are currently on,
    return all possible times a binary watch could represent.
    Example:
    Input: n = 1
    Return: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
    """
    return [
        "%d:%02d" % (h, m)
        for h in range(12)
        for m in range(60)
        if (bin(h) + bin(m)).count("1") == num
    ]
