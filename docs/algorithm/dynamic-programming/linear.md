# dp 入门

## 概述

dp 就是一种状态存储技术。任何时候，你需要记录中间过程的状态，并且将状态用于后续**多个**计算过程中，你就需要使用到dp。

dp 题目往往问的就是一个状态的事情，但是我们要有能力去分辨出，我们要不要额外构造多个状态：
- {lightblue:不需要输出存储的方案，只需要结果}
- {lightblue:不同的状态之间会互相影响}

dp 的解题核心在于写递推式子，dp 的理解核心在于储存什么。

有的人会觉得：啊！搜索加上记忆不就也差不多吗？   
这个感觉是没错的 {lightsalmon:记忆化搜索} 和 {lightsalmon:dp} 只是互为表里的关系，dp强调初始化状态与状态转移，搜索强调重复地执行答案搜索的过程。  
简单来说就是，一个自顶向下，一个从底向上。


## 母题-纸币问题

### 题干

纸笔问题是统计种类的问题。

- [P2834 纸币问题 3](https://www.luogu.com.cn/problem/P2834)

你有 $n$ 种面额互不相同的纸币，现在你需要支付 $w$ 的金额，求问有多少种方式可以支付面额 $w$，答案对 $10^9+7$ 取模。

- [P2840 纸币问题 2](https://www.luogu.com.cn/problem/P2840)

你有 $n$ 种面额互不相同的纸币，现在你需要支付 $w$ 的金额，求问有多少种方式可以支付面额 $w$，答案对 $10^9+7$ 取模。  
**<font style="color:lightblue;">不同种货币得到的属于不同的方案</font>**。

### 解析

动态规划是状态的转移的设计，我们先考虑状态的表示 —— $dp[i]$ 表示方式的话，$i$ 就表示金额了，运算的时候就需要用 代表纸币的金额 $a[i]$ 去进行状态的转移： 
$$dp[i] = f(dp\left[ i-a \left[ j \right] \right] )$$  
而状态转移中，使用了的 $a[i]$，就自动保存在了这个方案里面。

<!-- <Badge type="warning" text="" />   -->
**<font style="color:lightblue;">那么具体状态是如何转移的呢？</font>**。  
对于{lightsalmon:不重复}的组合而言，我们应该是按照{lightsalmon:纸币}更新，也即每个纸笔独立地更新一次 —— 这样能保证纸币只被使用一次。  
而对于{lightsalmon:重复}的组合而言，我们应该按照{lightsalmon:每一个金额}，进行纸币组合的考虑，这样同样一个纸币可能在不同金额的组成出现多次，进而也是不同的方案组合了。



```C++
// 每个方案，只算一次 - P2834 纸币问题 3
#include<iostream>
using namespace std;

const int mod = 1e9 + 7;
int a[1005], dp[10005];

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n, w; cin >> n >> w;
    for (int i = 0; i < n; ++i) cin >> a[i];
    dp[0] = 1;
    for (int i = 0; i < n ; ++i) {
        for(int j=a[i];j<=w;++j)
            if(dp[j-a[i]])
                dp[j] = (dp[j-a[i]] + dp[j]) % mod;
    }
    cout << dp[w] << '\n';
    return 0;
}

```


```C++
// 要考虑元素不同的位置 P2840 纸币问题 2
#include<iostream>
using namespace std;

const int mod = 1e9 + 7;
int a[1005], dp[10005];

int main()
{
//    ios::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);

    int n, w; cin >> n >> w;
    for (int i = 0; i < n; ++i) cin >> a[i];
    dp[0] = 1;
//    循环1
//    for (int j = 0; j <= w; ++j) {
//        for (int i = 0; i < n && j + a[i] <= w; ++i) {
//            dp[j + a[i]] = (0ll + dp[j + a[i]] + dp[j]) % mod;
//        }
//    }
//    循环2
    for (int j = 1; j <= w; ++j) {
        for (int i = 0; i < n && j>=a[i] ; ++i) {
            dp[j] = (0ll + dp[j] + dp[j-a[i]]) % mod;
        }
    }
    cout << dp[w] << '\n';
    return 0;
}

```

## 入门题-数字三角形

- [P1216 [IOI 1994 / USACO1.5] 数字三角形 Number Triangles](https://www.luogu.com.cn/problem/P2834)

题目意思如图：

![数字三角形示意图](https://cdn.luogu.com.cn/upload/image_hosting/95pzs0ne.png)

其实只需要关注到更新时候的顺序就行 —— 写代码的时候会自动观察到的。

```C++
#include<bits/stdc++.h>
using namespace std;
const int N = 1e3+100;
int mp[N][N],dp[N];

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int r;
    cin >> r;
    for(int i=0;i<r;++i){
        for(int j=0;j<=i;++j)cin >> mp[i][j];
    }

    // 可以来自 左上角以及正上方
    // 这里如果反着遍历更新则答案错误 —— 读者可以自行思考一下。
    dp[0] = mp[0][0];
    for(int i=1;i<r;++i){
        dp[i] = dp[i-1] + mp[i][i];
        for(int j=i-1;j>=1;--j)
            dp[j] = max(dp[j-1],dp[j])+mp[i][j];
        dp[0] = dp[0] + mp[i][0];
    }
    int ans = -1;
    for(int i=0;i<r;++i)ans = max(ans,dp[i]);
    
    cout << ans <<'\n';
    return 0;
}
```