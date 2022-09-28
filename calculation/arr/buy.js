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
