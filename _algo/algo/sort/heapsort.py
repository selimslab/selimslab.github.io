from heapq import heappush, heappop


def heapsort(iterable):
    h = []
    for val in iterable:
        heappush(h, val)
    # or just h = heapify(iterable)
    return [heappop(h) for i in range(len(h))]


assert heapsort([1, 3, 5, 7, 9, 2, 4, 6, 8, 0]) == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
