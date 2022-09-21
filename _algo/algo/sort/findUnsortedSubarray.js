function findUnsortedSubarray(nums){
  return nums.slice()
    .sort((a, b) => a - b)
    .reduce((acc, curr, idx) => acc + (curr === nums[idx] ? ' ' : 'x'), '')
    .trim().length;
}

let ans = findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])
console.log(ans)
// answer is 5 
// it's enough to sort [6, 4, 8, 10, 9] to make all sorted 