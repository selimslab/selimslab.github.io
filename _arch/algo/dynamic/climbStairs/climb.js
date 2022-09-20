let climbStairs = function(n) {
    memo = {1:1,2:2}
    
    function climb(n){
        if ( !(n in memo)){
            memo[n] = climb(n-1) + climb(n-2)
        }
            
        return memo[n] 
    }

    return climb(n)
};