func rob(nums []int) int {
    n:=len(nums)
    if n==0{
        return 0 
    }
    if n==1{
        return nums[0]
    }
    // max of 0 to n-1 and 1 to n, because first and last homes are adjacent 
    return max(robLinear(nums[1:n]), robLinear(nums[0:n-1]))
}

func robLinear(nums []int) int {
    twoBefore, oneBefore := 0,0
    
    for i:=0; i<len(nums); i++{
        oneBefore, twoBefore = max(oneBefore, twoBefore+nums[i]), oneBefore
    }
    
    return oneBefore
}

func max(a int, b int) int {
    if a>b{
        return a
    }   
    return b 
}



