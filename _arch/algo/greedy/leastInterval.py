from typing import List
import collections


def leastInterval(tasks: List[str], n: int) -> int:
    # https://leetcode.com/problems/task-scheduler/

    counts = list(collections.Counter(tasks).values())  # [3,3]
    max_count = max(counts)  # 3
    num_of_chars_with_max_count = counts.count(max_count)  # 2, A and B

    num_of_chunks_with_idles = max_count - 1  # 2  -> A  A  A

    # either a task will fill an empty place or the place stays idle,
    # either way the chunk size stays the same
    length_of_a_chunk_with_idles = n + 1  # 3 -> A _ _ A _ _ A

    # on the final chunk, there will only be most frequent letters
    length_of_the_final_chunk = num_of_chars_with_max_count  # 2

    length_of_all_chunks = (
        num_of_chunks_with_idles * length_of_a_chunk_with_idles
    ) + length_of_the_final_chunk  # 2*3 + 2 = 8
    # -> A B _ A B _ A B

    return max(len(tasks), length_of_all_chunks)


assert leastInterval(["A", "A", "A", "B", "B", "B"], 2) == 8
# A -> B -> idle -> A -> B -> idle -> A -> B
# There is at least 2 units of time between any two same tasks.

assert (
    leastInterval(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], n=2)
    == 16
)
# One possible solution is
# A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
