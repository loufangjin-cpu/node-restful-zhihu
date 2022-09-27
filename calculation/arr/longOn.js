// !最长递增子序列: 目的就是找出最大不移动的节点数
// 1: 循环数组得到每一个节点的最长递增子序列dp
// 2: 对dp的最大值进行遍历处理， 通过dp分别找出原数组中的索引值，保证最后一项开始插入数组
// 3: dp长度发生改变，保证只取最大项之前的数据， 避免拿到dp 最大项目之后的索引值， 影响数据
// 解1: o(n^2) 动态规划
const longOn = (arr) => {
    if(!arr.length) return
    let dp = new Array(arr.length).fill(1)
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < i; j++) {
            if(arr[j] < arr[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    let result = []
    let max = Math.max(...dp);
    for(let i = max; i >=1; i--) {
        findNode(dp, i, result, arr)
    }
    return result
}
function findNode (dp, i, result, arr) {
    // 找出i对应数组中的索引值
    let index = dp.lastIndexOf(i)
    result.unshift(arr[index])
    // 保证每次添加都是最大项之前的数据
    dp.length = index + 1
}
// console.log(longOn([1,2,1,4,4]))
// 解2: 动态规划 + 二分法 nlogn
// 用一个尾数组tail存放遍历过的原数组的位置关系，是一个递增关系。
// 1、循环原数组, 尾数组tail的最后一位小于原数组当前值，直接把当前原数组push到tail中
// 2、二分尾数组tail,找到原数组[i]的位置: left , right , middle
// 一分为二，中间值和原数组值对比，中间值 < 原数组值: left = middle + 1, 否则 right = middle
function lengthOfLIS(nums) {
    let n = nums.length;
    if (n <= 1) {
        return n;
    }
    let tail = [nums[0]];//存放最长上升子序列数组
    for (let i = 0; i < n; i++) {
        //当nums中的元素比tail中的最后一个大时 可以放心push进tail
        if (nums[i] > tail[tail.length - 1]) {
            tail.push(nums[i]);
        } else {
            //否则进行二分查找
            let left = 0;
            let right = tail.length - 1;
            while (left < right) {
                let mid = (left + right) >> 1;
                if (tail[mid] < nums[i]) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            tail[left] = nums[i];//将nums[i]放置到合适的位置，此时前面的元素都比nums[i]小
        }
    }
    return tail.length;
}
console.log(lengthOfLIS([1, 4, 3,5,8,7]))
