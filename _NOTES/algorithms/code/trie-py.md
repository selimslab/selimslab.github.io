---
tags: gr
layout: code
---


```python
class Trie:
    """ or prefix tree """
    def __init__(self):
        """
        a child of a Trie is a Trie        
        """
        self.trie = {}
        
    def insert(self, word: str) -> None:
        """
        Inserts a word into the trie.
        """
        t = self.trie
        for letter in word:
            if letter not in t:
                t[letter] = {}
            t = t[letter]
        t["#"] = "#"  

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the trie.
        """
        return self.startsWith(word + '#')
        

    def startsWith(self, prefix: str) -> bool:
        """
        Returns if there is any word in the trie that starts with the given prefix.
        """
        t = self.trie 
        for letter in prefix:
            if letter not in t:
                return False
            t = t[letter]
        return True

def test_trie():
  trie = Trie()
  trie.insert("apple")
  assert trie.search("apple") is True
  assert trie.search("app") is False
  assert trie.startsWith("app") is True
  trie.insert("app")
  assert trie.search("app") is True
```
