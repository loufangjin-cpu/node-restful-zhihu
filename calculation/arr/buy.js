//  !买卖股票最大收益: 卖出-买入-手续费 的最大值
// 贪心: 局部最优， 从而得到全局最优
// 1、寻找买入的最佳时间，一次性手续费
// 2、如果是持续增长，就继续持有
var maxProfit = function(prices, fee) {
    let list = prices
    let pre = fee
   if(!list?.length) return 0
    let buy = list[0] + pre
    let sum = 0
    for(let i = 1; i < list.length; i++) {
        if(list[i] + pre < buy) { // 1: 计算买入时机 : 第二天 + 手续费 < 第一天 + 手续费 => 第二天买入
            buy = list[i] + pre
        } else if (list[i] > buy) { //2: 计算卖出时机： 第二天 大于第一天 + 手续费
            sum += list[i] - buy
            // 避免持续涨， 持续涨不卖，否则就卖掉
            // 假设持续涨, 手续费是一份，所以满足: 第一天:list[i] - buy , 第二天：list[i + 1] - list[i]
            // 第二天总收益就是 list[i + 1] - list[i] + list[i] - buy
            buy = list[i]
        }
    }
    return sum
};

// !买卖股票之交易明细、 哪几天发生了交易
// 记录每一次买入的索引minIndex，当minIndex不变的时候，在卖出的时候对minIndex进行存放对应买卖的值
var maxProfitResult = function(prices, fee) {
    let list = prices
    let pre = fee
   if(!list?.length) return 0
    let buy = list[0] + pre
    let sum = 0
    let minIndex = 0 // 记录买入的
    let result = {}
    let arr = []
    for(let i = 1; i < list.length; i++) {
        if(list[i] + pre < buy) { // 1: 计算买入时机 : 第二天 + 手续费 < 第一天 + 手续费 => 第二天买入
            buy = list[i] + pre
            minIndex = i
        } else if (list[i] > buy) { //2: 计算卖出时机： 第二天 大于第一天 + 手续费
            sum += list[i] - buy
            // 避免持续涨， 持续涨不卖，否则就卖掉
            // 假设持续涨, 手续费是一份，所以满足: 第一天:list[i] - buy , 第二天：list[i + 1] - list[i]
            // 第二天总收益就是 list[i + 1] - list[i] + list[i] - buy
            buy = list[i]
            result[minIndex] = [list[minIndex], list[i]]
        }
    }
    Object.keys(result).forEach(item => {
        arr.push(result[item])
    })
    return {
        sum,
        arr,
        result
    }
};
// console.log(maxProfitResult([1, 12, 13, 9, 15, 8, 6, 16], 2));
// ! 股票一次性买入和卖出 的最大收益
var maxProfit = function(prices) {
    if(!prices?.length) return 0
    let max = 0
    let buy = prices[0]
    for(let i = 1; i< prices.length; i++) {
        // 寻找买入点
        buy = Math.min(buy, prices[i])
        max = Math.max(max, prices[i] - buy)
    }
    return max
};
// !硬币找零问题
// 给定不同面额的硬币，coins 和一个总金额 amount，编写一个函数来计算可以凑成总金额所需的最少的硬币个数
// 求解的是最少的硬币*个数*，枚举的硬币数量1
// 比如: coins = [1, 2, 3, 5], amount = 5
// F(5) = min(F(5-c1), F(5-c2), F(5-c3,F(5-c4))) + 1
//     = min(F(5-1), F(5-2), F(5-3),F(5-5)) + 1
//     = min(F(4), F(3), F(2), F(0)) + 1
//     = min(2,1,1,0) + 1
//     = 1

// 完全背包之求凑满背包的最少物品数:
// 容量->amount; 物品重量->coins[i]; 价值->1; 优化目标->求恰好凑满背包的物品最小价值
// 1.状态定义:dp[j]为凑满容量为j的背包所需最少物品数
// 2.状态转移:考虑coins[i]
//     2.1 当j<coins[i]时:装不下,继承上一个dp[j]的值
//     2.2 当j>=coins[i]时:可以装得下,可以选择装或者不装中价值小的(物品数小的)进行转移
//         即:dp[j]=min(dp[j],dp[j-coins[i]+1])
// 3.初始化:容量为0,最少要装0个就可以装满->dp[0]=0,看转移方程,其他的要初始化为Integer.MAX_VALUE
// 4.遍历顺序:这里求最少的物品数,因此排列与组合均可,这里先物品后容量,物品顺序无所谓,容量必须正序(完全背包)
// 5.返回形式:返回如果dp[amount]有转移直接返回,如果没有转移返回-1

// function findCoins(coins, amount) {
//     if (coins.length === 0) return -1;
//     // 用于保存每个目标总额对应的最小硬币个数
//     const f = [];
//     // 提前定义已知情况
//     f[0] = 0;
//     // 遍历 [1, amount] 这个区间的硬币总额
//     for (let i = 1; i <= amount; i++) {
//       // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
//       f[i] = Infinity;
//       // 循环遍历每个可用硬币的面额
//       for (let j = 0; j < coins.length; j++) {
//         // 若硬币面额小于目标总额，则问题成立
//         if (i - coins[j] >= 0) {
//           // 状态转移方程
//           f[i] = Math.min(f[i], f[i - coins[j]] + 1);
//         }
//       }
//     }
//     // 若目标总额对应的解为无穷大，则意味着没有一个符合条件的硬币总数来更新它，本题无解，返回-1
//     if (f[amount] === Infinity) {
//       return -1;
//     }
//     // 若有解，直接返回解的内容
//     return f[amount];
//   }
  
//   console.log(findCoins([1, 2, 5], 11)); // 3