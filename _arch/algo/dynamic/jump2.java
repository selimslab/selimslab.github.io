  /*
  reach the last index in the minimum number of jumps.
  Input: [2,3,1,1,4]
  Output: 2
  */
  public int jump(int[] nums) {
    int steps = 0;
    int position = nums.length - 1;
        
    while(position != 0){
        for(int i=0;i<position;i++){
            if(i+nums[i]>=position){
                position=i;
                steps++;
                break;
            }             
        }
    }
    return steps;
}
}