const rob = function(nums) {
    if (!nums)  return 0 
      
    let prev1 = prev2 = 0 
    
    for (num of nums){
         [prev1, prev2] = [Math.max(prev2+num, prev1), prev1]
    }
       
    return prev1
};