def solution(total_lambs):
    # Your code here
    """
    max 10**9
    1. the most junior gets 1 
    2. lambs[i] <= lambs[i-1] *2 
    3. lambs[i] <= lambs[i-1] + lambs[i-2] i>=2
    and lambs[1]>= lambs[0]
    4. must hire if possible 
    """

    def get_generous(total_lambs):
        """
        get number of henchman you can hire 
        
        go doubling
        will check 1,2,3
        1,2,4,8,16..
        
        """
        total = 0
        next_lamb = 1
        henchman_count = 0
        
        while total + next_lamb <= total_lambs:
            total += next_lamb
            henchman_count += 1
            next_lamb *= 2
            
        return henchman_count
            
    def get_stingy(total_lambs):
        """
        go summing 
        
        1,1,2,3,5,8 
        fibonacci 
        """
        total = 0
        a, b = 1, 1
        henchman_count = 0
        
        while total + a <= total_lambs:
            total += a
            henchman_count += 1
            a,b = b, a+b
            
        return henchman_count
    
    generous = get_generous(total_lambs)
    stingy = get_stingy(total_lambs)

    return stingy-generous


def get_generous(total_lambs):
    """
    get number of henchman you can hire 
    
    go doubling
    will check 1,2,3
    1,2,4,8,16..
    
    """
    total = 0
    next_lamb = 1
    henchman_count = 0
    
    while total + next_lamb <= total_lambs:
        total += next_lamb
        henchman_count += 1
        next_lamb *= 2

    print("generous", total, henchman_count,next_lamb, total_lambs-total)

    return henchman_count
        
def get_stingy(total_lambs):
    """
    go summing 
    
    1,1,2,3,5,8 
    fibonacci 
    """
    total = 0
    next_lamb, lamb_after = 1, 1
    henchman_count = 0
    
    while total + next_lamb <= total_lambs:
        total += next_lamb
        henchman_count += 1
        next_lamb,lamb_after = lamb_after, next_lamb+lamb_after
    
    print("stingy", total, henchman_count,next_lamb, total_lambs-total)
    return henchman_count

cases = [3123,35345,64576, 10**9, 10**9+3423, 0, 1,3,5,8,]

for case in cases:
    total_lambs = case 
    generous = get_generous(total_lambs)
    stingy = get_stingy(total_lambs)
    print(generous,stingy)
    print()