```py
from collections import Counter

class Window:
    def __init__(self):
        self.wc = {}
        self.q = deque()

    def add(self, w):
        self.q.append(w)
        if w in self.wc:
            self.wc[w] += 1
        else:
            self.wc[w] = 1   

    def popleft(self):
        w = self.q.popleft()
        if self.wc[w] > 1:
            self.wc[w] -= 1
        else: 
            self.wc.pop(w)

    def clear(self):
        self.q.clear()
        self.wc.clear()

    def __len__(self):
        return len(self.q)

    def __eq__(self, other):
        return self.wc == other.wc
        
    
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        n=len(words)
        m=len(words[0])  
        winlen = n*m
        if len(s)<winlen:
            return []

        wc = Counter(words)
        res = []

        cur = Counter()

        for i in range(m):
            j=i
            while j+m <= len(s):  
                w = s[j:j+m]
                if w in  and seek.wc.get():
                    cur.add(w)
                else:
                    cur.clear()
                j+=m
                if len(cur) == len(seek):
                    if cur == seek:
                        res.append(j-winlen)
                    cur.popleft()
                        
                            
        return res
        
```