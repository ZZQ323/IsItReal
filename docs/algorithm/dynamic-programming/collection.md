
# DP 题的各种变式题单

## P1002 [NOIP 2002 普及组] 过河卒
::: details **题目信息**
- **提交链接**：[P1002 [NOIP 2002 普及组] 过河卒](https://www.luogu.com.cn/problem/P1002) 
- **母题**
  - [P1434 [SHOI2002] 滑雪](https://www.luogu.com.cn/problem/P1434)
  - [P2196 [NOIP 1996 提高组] 挖地雷](https://www.luogu.com.cn/problem/P2196)
:::
::: tip **分析**
- 这题其实没什么太多的思考，dp转移方程很简单，因为是见怪不怪的那种{lightblue:“统计方案个数”}，所以{lightblue:转移方程}是 $dp[from] += dp[to]$
- 而难点在于{lightblue:更新顺序}，一般的数组我们可以强制依次遍历，滑雪题我们能清楚地知道行走的规则 —— 二者都很好更新。这一题属于是需要自己发现更新的规律，并且手动处理一下更新中的问题
- {lightblue:借由BFS/DFS的性质}，我们并不需要很特殊地“倒着遍历”，去保证“一次更新不会影响下一次更新”（一维数组的滚动数组更新是需要考虑这个的）；与之相反的则是，考虑搜索的顺序，去防止反复更新。
:::
::: danger 请注意
  - {lightblue:数值很大}，需要用 long long 。
:::

如果使用 DFS 去进行搜索的话，{lightsalmon:它不能保证“不走回头路”}，进而会导致，本来能一个 “右” 向走到的地方结果绕了一个 “下右上”。  

```C++
int DP(int x,int y)
{
    if(~dp[x][y])return dp[x][y];
    if(x==0 && y==0)return dp[x][y]=1;
    int ret = 0;
    vis[x][y] = 1;
    for(int i=0;i<3;++i){
        // 兵的走路横平竖直
        int nx = x+Fx[i];
        int ny = y+Fy[i];
        if(!check(nx,ny))continue;
        bool flag = 0;
        // 不要踩马的攻击范围
        for(int j=0;j<8;++j){
            // 马走日
            int hx = C.x+Hx[j];
            int hy = C.y+Hy[j];
            if(hx==nx && hy==ny){
                flag = 1;
                break;
            }
        }
        if(flag)continue;
        if(vis[nx][ny])continue;
        ret += DP(nx,ny);
    }
    vis[x][y] = 0;
    return dp[x][y] = ret;
}
```

所以改成BFS就好了，它能保证你不蛇形走路。

```C++
void DP(const Point & beg)
{
    dp[beg.x][beg.y] = 1;
    queue<Point> qe;
    qe.push(beg);
    while( !qe.empty() ){
        auto cur = qe.front();
        qe.pop();
        if(vis[cur.x][cur.y])continue;
        // cout << "在" << cur.x << ' ' << cur.y << '\n';
        vis[cur.x][cur.y] = 1;
        for(int i=0;i<4;++i){
            int nx = cur.x+Fx[i];
            int ny = cur.y+Fy[i];
            if(!check(nx,ny))continue;
            bool flag = 0;
            // 不要踩马的攻击范围
            // 马的位置也不要踩！！！
            for(int j=0;j<9;++j){
                // 马走日
                int hx = C.x+Hx[j];
                int hy = C.y+Hy[j];
                if(hx==nx && hy==ny){flag = 1;break;}
            }
            if(flag)continue;
            // 对更新开放，对取出闭合
            if( !vis[nx][ny] )dp[nx][ny] += dp[cur.x][cur.y];
            qe.push({nx,ny});
        }
        // print();
    }
}
```

还有一些细节，{lightsalmon:比如} $dp$ {lightsalmon:更新的时候，不能让他循环更新}。  
以下是全部代码，可以清晰地看到遍历的过程。之前通过打印发现dp很唐地通过了马的位置 —— 属于是贴脸开大。

```C++
#include<bits/stdc++.h>
using namespace std;
using ll  = long long ;

struct Point{
    int x;int y;
}B,C;
const int Fx[] = {0,-1,0,1};
const int Fy[] = {-1,0,1,0};
const int Hx[] = {0,1,-1,2,-2,2,-2,1,-1};
const int Hy[] = {0,2,2,1,1,-1,-1,-2,-2};

int maxX,maxY;
inline bool check(int x,int y){return x>=0 && x<=maxX && y>=0 && y<=maxY;}

ll dp[30][30]={};
bool vis[30][30]={};

void print()
{
    for(int i=0;i<=maxX;++i){
        for(int j=0;j<=maxY;++j){cout<< dp[i][j]<< ' ';}
        cout << '\n';
    }
}

void DP(const Point & beg)
{
    dp[beg.x][beg.y] = 1;
    queue<Point> qe;
    qe.push(beg);
    while( !qe.empty() ){
        auto cur = qe.front();
        qe.pop();
        if(vis[cur.x][cur.y])continue;
        // cout << "在" << cur.x << ' ' << cur.y << '\n';
        vis[cur.x][cur.y] = 1;
        for(int i=0;i<4;++i){
            int nx = cur.x+Fx[i];
            int ny = cur.y+Fy[i];
            if(!check(nx,ny))continue;
            bool flag = 0;
            // 不要踩马的攻击范围
            // 马也不要踩！！！
            for(int j=0;j<9;++j){
                // 马走日
                int hx = C.x+Hx[j];
                int hy = C.y+Hy[j];
                if(hx==nx && hy==ny){flag = 1;break;}
            }
            if(flag)continue;
            // 对更新开放，对取出闭合
            if( !vis[nx][ny] )dp[nx][ny] += dp[cur.x][cur.y];
            qe.push({nx,ny});
        }
        // print();
    }
}

int main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
//    memset(dp,-1,sizeof dp);
    cin >> B.x >> B.y >> C.x >> C.y;
    maxX = max(B.x,C.x+2);
    maxY = max(B.y,C.y+2);
    DP(B);
    cout <<  dp[0][0] << '\n';
    return 0;
}

```

## P1049 [NOIP 2001 普及组] 装箱问题
::: details **题目信息**
- **提交链接**：[P1049 [NOIP 2001 普及组] 装箱问题](https://www.luogu.com.cn/problem/P1049) 
- **母题**：
  - [P1048 [NOIP 2005 普及组] 采药](https://www.luogu.com.cn/problem/P1048)
  - [P1802 5 倍经验日](https://www.luogu.com.cn/problem/P1802)  
:::
::: tip **分析**
- 经典的只取一次，没什么看点。
:::

```C++
#include<bits/stdc++.h>
using namespace std;
using ll  = long long ;

const int N = 30;
const int M = 2e4+100;
int a[N];
bool dp[M]={};

int main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int m,n; cin >> m >>n;
    for(int i=0;i<n;++i)cin >> a[i];
    sort(a,a+n);
    //  任取若干个装入箱内（也可以不取）
    dp[0] = 1;
    for(int i=0;i<n;++i){
        for(int j=m;j>=a[i];--j){
            dp[j] |= dp[j-a[i]];
        }
    }
    for(int j=m;j>=0;--j){
        if(dp[j]){
            cout << m-j << '\n';
            break;
        }
    }
    return 0;
}

```

## P1616 疯狂的采药

::: details **题目信息**
- **提交链接**：[P1616 疯狂的采药](https://www.luogu.com.cn/problem/P1616) 
- **母题**
  - [P2834 纸币问题 3](https://www.luogu.com.cn/problem/P2834)
  - [P2840 纸币问题 2](https://www.luogu.com.cn/problem/P2840)
:::

::: tip **分析**
- 经典的取多次，也没什么看点。
- 注意数据范围，int会爆炸。
:::

```C++
#include<bits/stdc++.h>
using namespace std;

const int M = 1e4+100;
const int T = 1e7+100;
int time1[M],value[M];
long long  dp[T]={};

int main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int t,m;cin >> t >> m;
    for(int i=0;i<m;++i) cin >> time1[i] >> value[i];
    for(int j=0;j<=t;++j){
        for(int i=0;i<m;++i){
            if(j>=time1[i]){
                dp[j] = max(dp[j],dp[j-time1[i]]+value[i]);
            }
        }
    }
    cout << dp[t] << '\n';
    return 0;
}

```

## P1164 小A点菜

::: details **题目信息**
- **提交链接**：[P1616 疯狂的采药](https://www.luogu.com.cn/problem/P1616) 
- **母题**
  - [P1048 [NOIP 2005 普及组] 采药](https://www.luogu.com.cn/problem/P1048)
  - [P1802 5 倍经验日](https://www.luogu.com.cn/problem/P1802)  
:::
::: tip **分析**
- 经典的只取一次，没什么看点。
:::

```C++
#include<bits/stdc++.h>
using namespace std;

const int M = 1e4+100;
const int N = 1e2+100;
int a[N],dp[M]={};

int main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int n,m; cin >> n >> m;
    // 每种菜只有一份
    for(int i=0;i<n;++i) cin >> a[i];
    dp[0] = 1;
    for(int i=0;i<n;++i){
        for(int j=m;j>=a[i];--j){
            dp[j] = max(dp[j],dp[j-a[i]]+dp[j]);
        }
    }
    cout << dp[m] << '\n';
    return 0;
}
```

## P1077 [NOIP 2012 普及组] 摆花

::: details **题目信息**
- **提交链接**：[P1077 [NOIP 2012 普及组] 摆花](https://www.luogu.com.cn/problem/P1077)
- **母题**
  - [P1048 [NOIP 2005 普及组] 采药](https://www.luogu.com.cn/problem/P1048)
  - [P1802 5 倍经验日](https://www.luogu.com.cn/problem/P1802)
:::
::: tip **分析**
- 变着花样出只拿一次 …… 
- 这里的关键问题是题目的特殊限制：{lightblue:不同种类的花需按标号的从小到大的顺序依次摆列} 以及 {lightblue:摆花时同一种花放在一起}，这要求我们一定要 “按花的类型遍历”，以及对每种花的个数和状态进行单独的讨论。
- 因为是统计组成类型，所以是 $dp += dp$；因为需要考虑前N个的情况，并进行没有规律的覆写，所以单独存储“前i个的情况”，考虑二维$dp[i][j]$为{lightsalmon:前i个，一共j个的方案个数}。
:::


```C++
#include<bits/stdc++.h>

using namespace std;

const int M = 1e2 + 100;
const int N = 1e2 + 100;
const int A = 1e2 + 100;
const int mod = 1e6 + 7;
int a[N];
int dp[N][M] = {}; // 考虑前i个，一共j个的方案数

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n, m;
    cin >> n >> m;
    // 每种菜只有一份
    for (int i = 0; i < n; ++i) cin >> a[i];
    // 第 i 种花不能超过 a[i] 盆
    // 摆花时同一种花放在一起
    // 不同种类的花需按标号的从小到大的顺序依次摆列
    // dp[0] = 1;
    // dp[i][j] += dp[i-1][j-k];
    for(int k=0;k<=a[0];++k) dp[0][k] = 1;
    for(int i=1;i<n;++i){
        for(int j=m;j>=0;--j){
            for(int k=0;k<=min(a[i],j);++k){
                dp[i][j] = (dp[i][j] + dp[i-1][j-k])%mod ;
            }
        }
    }
    cout << dp[n-1][m] << '\n';
    return 0;
}
```

## 
