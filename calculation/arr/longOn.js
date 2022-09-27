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
function lengthOfLIS(nums) {
    if(!nums?.length) return
    let tail = [nums[0]]
    for(let i = 0; i < nums.length; i++) {
        if(tail[tail.length - 1] < nums[i]) {
            tail.push(nums[i])
        } else {
            let left = 0
            let right = tail.length - 1
            while(left < right) {
                let mid = (left + right) >> 1
                if(tail[left] < nums[i]) {
                    left = mid + 1
                } else {
                    right = mid
                }
            }
            tail[left] = nums[i]
        }
    }
    return tail.length
}
console.log(lengthOfLIS([1, 4, 3,5,8,7]))
