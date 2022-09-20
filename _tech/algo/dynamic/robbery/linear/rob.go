func max(a int,b int) int{
    if a>b{
        return a
    }
    return b 
}

func rob(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    p1, p2 := 0, 0 
    for _, num := range(nums) {
        p1 , p2 = max(p2+num, p1), p1
    } 
    
    return p1 
}