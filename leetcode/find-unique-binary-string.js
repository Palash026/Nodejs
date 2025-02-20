var findDifferentBinaryString = function(nums) {
    let n = nums.length;
    let res = '';

    for(let i = 0; i < n; i++){
        res += nums[i][i] === '0' ? '1' : '0';
    }

    return res;
};

const tests = [
    findDifferentBinaryString(["01","10"]), // "11"
    findDifferentBinaryString(["00","01"]), // "11"
    findDifferentBinaryString(["111","011","001"]), // "101"
]

for(let test of tests){
    console.log(test)
}