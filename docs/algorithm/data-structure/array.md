# 数组

## 什么是数组

数组是最基本的数据结构之一，它在内存中是连续存储的。

## 特点

- **随机访问**：O(1) 时间复杂度
- **插入删除**：O(n) 时间复杂度
- **固定大小**：静态数组大小固定

## 代码示例
```javascript
// 创建数组
const arr = [1, 2, 3, 4, 5];

// 访问元素
console.log(arr[0]); // 1

// 遍历数组
arr.forEach(item => console.log(item));
```

## 常见问题

### 1. 两数之和

给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

## 总结

数组是最基础也是最重要的数据结构，熟练掌握数组操作是算法学习的第一步。