# dp 入门

## 概述

dp 就是一种状态存储技术。任何时候，你需要记录中间过程的状态，并且将状态用于后续**多个**计算过程中，你就需要使用到dp。

dp 题目往往问的就是一个状态的事情，但是我们要有能力去分辨出，我们要不要额外构造多个状态：
- {lightblue:不同的状态之间会有“包含关系”}

dp 的解题核心在于写递推式子，dp 的理解核心在于储存什么。

有的人会觉得：啊！搜索加上记忆不就也差不多吗？   
这个感觉是没错的 {lightsalmon:记忆化搜索} 和 {lightsalmon:dp} 只是互为表里的关系，dp强调初始化状态与状态转移，搜索强调重复地执行答案搜索的过程。  
简单来说就是，一个自顶向下，一个从底向上。


## 母题-拿不限次数

### 题干

纸笔问题是统计种类的问题。

- [P2834 纸币问题 3](https://www.luogu.com.cn/problem/P2834)

你有 $n$ 种面额互不相同的纸币，现在你需要支付 $w$ 的金额，求问有多少种方式可以支付面额 $w$，答案对 $10^9+7$ 取模。

- [P2840 纸币问题 2](https://www.luogu.com.cn/problem/P2840)

你有 $n$ 种面额互不相同的纸币，现在你需要支付 $w$ 的金额，求问有多少种方式可以支付面额 $w$，答案对 $10^9+7$ 取模。 
{lightblue:不同种货币得到的属于不同的方案}。

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

## 母题-只许拿一次

### 题干  

- [P1048 [NOIP 2005 普及组] 采药](https://www.luogu.com.cn/problem/P1048)

山洞里有一些不同的草药，采每一株都需要一些时间 $t$，每一株也有它自身的价值 $v$ 。  
我会给你一段时间 $T$ ，在这段时间里，你可以采到一些草药。  
请让采到的草药的总价值最大。

### 解析

采山药，因为涉及到 “只许拿一次”，所以我们得倒着遍历 —— 就没了。

```C++
#include<bits/stdc++.h>
using namespace std;

const int M = 1e2+100;
const int T = 1e3+100;
// T 代表总共能够用来采药的时间，M 代表山洞里的草药的数目。
struct herb{
    int time;
    int value;
} h[M]={};
int dp[T]={};

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int t,m;cin >>t>>m;
    // 分别表示采摘某株草药的时间和这株草药的价值。
    for(int i=0;i<m;++i){cin >> h[i].time >> h[i].value ;}
    for(int i=0;i<m;++i){
        for(int k=t;k>=h[i].time;--k){
            dp[k] = max(dp[k],dp[k-h[i].time]+h[i].value);
        }
    }
    cout << dp[t] << '\n';
    return 0;
}
```

之前我写的是二维dp，因为有点没把握是否会覆盖 —— 你写了二维dp之后会发现，其实没有必要！  

```C++
#include<bits/stdc++.h>
using namespace std;

const int M = 1e2+100;
const int T = 1e3+100;
// T 代表总共能够用来采药的时间，M 代表山洞里的草药的数目。
struct herb{
    int time;
    int value;
} h[M]={};
int dp[M][T]={};

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int t,m;cin >>t>>m;
    // 分别表示采摘某株草药的时间和这株草药的价值。
    for(int i=0;i<m;++i){cin >> h[i].time >> h[i].value ;}
    for(int i=0;i<m;++i){
        for(int k=t;k>=h[i].time;--k)
            dp[i][k] = h[i].value;
        for(int j=i-1;j>=0;--j){
            for(int k=t;k>=h[i].time;--k){
                dp[i][k] = max(dp[i][k],dp[j][k-h[i].time]+h[i].value);
            }
        }
    }
    // 不一定选到最后一个！
    int ans = -1;
    for(int i=0;i<m;++i)ans = max(ans,dp[i][t]);
    cout << ans << '\n';
    return 0;
}
```

## 母题-多维dp

多维dp，其实就是因为“决策受到多个因素影响”。  
没有“一眼丁真的方法”去看是否一道题目是多维dp，你得在考虑状态转移的过程中才能发现，究竟需要多少个因素。

### 题干

### 解析

## 母题-图搜索与结果输出

### 题干

- [P2196 [NOIP 1996 提高组] 挖地雷](https://www.luogu.com.cn/problem/P2196)

当地窖及其连接的数据给出之后，你可以从任一处开始挖地雷，然后每次可以移动到 {lightblue:一个编号比当前节点大且联通的节点去挖地雷} ，当无满足条件的节点时挖地雷工作结束。  
请你设计一个挖地雷的方案，使某人能挖到 {lightblue:最多的地雷} 。

### 解析

这题的关系被抽象为 {lightsalmon:邻接矩阵} ，也即什么状态可以从什么状态过渡过来。  
在设计状态过渡的时候，我们得找到“不重复更新”的路径， —— 既然dp问题总是存在一个状态包含另一个状态，那么我们先更新小状态，然后更新大状态即可。  
这里则是 {lightsalmon:一个编号比当前节点大且联通的节点去挖地雷}，我们先更新小节点，然后大节点加入的时候则可以包含前面的决策计算 —— 而不是相反。  

```C++
#include<bits/stdc++.h>
using namespace std;

const int N = 30;
int a[N]={}, dp[N]={},pre[N]={};
bool g[N][N]={};

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    memset(pre,-1,sizeof pre);
    int n;cin >> n;
    for (int i = 0; i < n; ++i) cin >> a[i],dp[i] = a[i];
    for(int i=0;i<n;++i){
        g[i][i] = 1;
        for(int j=i+1;j<n;++j){
            bool flag ;
            cin >> flag;
            g[j][i] = g[i][j] = flag;
        }
    }
    // 临接矩阵输出debug
    // for(int i=0;i<n;++i){for(int j=0;j<n;++j){cout<<g[i][j]<<' ';}cout<<'\n';}
    for(int i=0;i<n;++i){
        for(int j=i+1;j<n;++j){
            if(g[i][j]){
                if( dp[j] < dp[i]+a[j]){
                    dp[j] = dp[i]+a[j];
                    pre[j] = i;
                }// 否则保持原样
            }
        }
    }
    int idx=-1,ans = -1;
    for(int i=0;i<n;++i){
        if( ans < dp[i]){
            ans = dp[i];
            idx = i;
        }
    }
    // 处理输入输出 —— 因为逻辑是“知道答案找结果”，所以倒着输出
    stack<int> stk;
    for(int i = idx;~i;i=pre[i]){stk.push(i+1);}
    cout<<stk.top();stk.pop();
    while(stk.size()){ cout<<' '<<stk.top();stk.pop();}
    cout<<'\n'<< ans <<'\n';
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