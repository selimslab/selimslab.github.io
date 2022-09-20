
func jump(nums []int) int {
    target := len(nums) - 1
    j := 0
    for (target != 0){
        for i:= 0; i<target; i++{
            if i+nums[i] >= target{
                j++ 
                target = i 
            } 
        }
    }
    
    return j 

}