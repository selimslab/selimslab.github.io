public class Solution{
    public static void main(String[] args) {

    };
    
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
    
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            } else {
                map.put(nums[i], i);
            }
        }
    
        throw new IllegalArgumentException("No two sum solution");
    }
}



assert new Solution().twoSum([2, 7, 11, 15], 9) == [0, 1]
// Because nums[0] + nums[1] = 2 + 7 = 9