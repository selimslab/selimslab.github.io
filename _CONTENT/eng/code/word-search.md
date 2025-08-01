---
---

```py

from dataclasses import dataclass, field

@dataclass
class TrieNode:
    children: dict = field(default_factory=dict)
    word = None

class Solution:
    # find all words in a board
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        rows, cols = len(board), len(board[0])
        
        SEEN = "#"

        dirs = ((0,1),(1,0),(-1,0),(0,-1))

        found = []

        trie = self.build_trie(words)

        def dfs(node, r, c):
            char = board[r][c]
            if char not in node.children:
                return 

            nxt = node.children[char]

            if nxt.word:
                found.append(nxt.word)
                nxt.word = None
                
            board[r][c] = SEEN
            for (dr,dc) in dirs:
                nr, nc = r+dr, c+dc
                if 0<=nr<rows and 0<=nc<cols and board[nr][nc] != SEEN:
                    dfs(nxt, nr, nc)
            board[r][c] = char


        for r in range(rows):
            for c in range(cols):
                dfs(trie,r,c)

        return found


    def build_trie(self, words):
        root = TrieNode()

        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word
        
        return root 

```
