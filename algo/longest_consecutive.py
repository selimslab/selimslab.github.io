    def longestConsecutive(self, nums: List[int]) -> int:
        numset = set(nums)
        ans = 0 
        
        for num in nums:
            if num-1 in numset:
                continue 
                
            current_num = num
            current_streak = 1 
            
            while current_num +1 in numset:
                current_streak += 1 
                current_num += 1
                
            ans = max(ans,current_streak)
            

        return ans 
            

assert longestConsecutive([100, 4, 200, 1, 3, 2]) == 4 