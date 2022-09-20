        
    
    def topo():
        ans = []
        visited = set()

        def dfs(node):
            
            neighbors = g.get(node,[])
            
            for n in neighbors:
                if n not in visited:
                    dfs(n)
               
            if node not in visited:
                visited.add(node)
                ans.append(node)


        for course in g:
            dfs(course)

            
        return ans[::-1]
        



