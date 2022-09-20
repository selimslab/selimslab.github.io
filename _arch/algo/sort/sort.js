function smallerNumbersThanCurrent(nums){
    const sortIncreasing = (a, b) => a - b;
    const sorted = [...nums].sort(sortIncreasing);
    const indexOfNum = num => sorted.indexOf(num);
    return nums.map(indexOfNum);
};

function assert(condition, message) {
    console.log(condition)
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

let ans = smallerNumbersThanCurrent([6,5,4,8]);
console.log(ans, typeof(ans));
console.log([...ans] == [2, 1, 0, 3]);
