---
---


```py
from dataclasses import dataclass

@dataclass
class Node:
    text: str
    nextNode : 'Node'
    
def test_linked_list(s):
    words = s.split()
    start = head = Node(text=None, nextNode=None)
    
    for w in words: 
        if head.text is None:
            head.text = w
        else:   
            node = Node(text=w, nextNode=None)
            head.nextNode = node
            head = node 
        
    cur = start 
    while cur: 
        print(cur.text)
        cur = cur.nextNode
        
    return start 
        
        
def search(head:Node, s:str)->bool:
    
    n = len(s)
    
    if head is None:
        return False
    
    # look at a node, if its text is longer then window, 
    # fsagsdghdfh-fsdg-fsdf
    # move the window
    # if there's less than window in the cur node 
    found = 0 
    backup = None
    curstart = 0 
    skipped = False

    while head:
        cur = head.text
        print(cur, found)
        # ex-cep-ti-o-nal
        
        if skipped:
            j = curstart 
        else: 
            j = 0
            
        skipped = False

        while j<len(cur):
            if cur[j] == s[found]:
                if backup is None:
                    backup = head
                    curstart = j
                found+=1 
            else:
                found=0
                head = backup 
                curstart += 1
                skipped = True 
                break
               
            if found == len(s):
                return True  
                
            j+=1

        if skipped: 
            continue 
        else:
            head = head.nextNode
        

        

    return False 
    

m = "aa aa ab"

s = "aaaab"

head = test_linked_list(m)

res = search(head, s)

print(res)

```