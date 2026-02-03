export default {
    // 网站标题
    title: '我的技术博客',
    // 网站描述
    description: '算法、前端、后端、数据库技术分享',
    // 主题配置
    themeConfig: {
        // 顶部导航栏（大分类）
        nav: [
            { text: '首页', link: '/' },
            { text: '算法', link: '/algorithm/', activeMatch: '/algorithm/' },
            { text: '前端', link: '/frontend/' },
            { text: '后端', link: '/backend/' },
            { text: '数据库', link: '/database/' }
        ],
        // 侧边栏配置（多层分类）
        sidebar: {
            // 算法栏目的侧边栏
            '/algorithm/': [
                {
                    text: '数据结构',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '数组、指针、链表', link: '/algorithm/data-structure/array' },
                        { text: '线段树-树状数组', link: '/algorithm/data-structure/interval-tree' },
                        { text: '二叉树与平衡树', link: '/algorithm/data-structure/bin-tree' },
                    ]
                },
                {
                    text: '动态规划',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '基础线性dp', link: '/algorithm/dynamic-programming/linear' },
                        { text: '区间dp', link: '/algorithm/dynamic-programming/interval' },
                        { text: '树形dp', link: '/algorithm/dynamic-programming/tree' },
                        { text: '数位dp', link: '/algorithm/dynamic-programming/digital' },
                        { text: '状压dp', link: '/algorithm/dynamic-programming/state' },
                    ]
                },
                {
                    text: '计算几何',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '闭包', link: '/algorithm/computational-geometry/linear' },
                        { text: '半平面角', link: '/algorithm/computational-geometry/interval' },
                        { text: '', link: '/algorithm/computational-geometry/tree' },
                    ]
                },
                {
                    text: '数论',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '幂等性', link: '/algorithm/number-theory/linear' },
                        { text: '', link: '/algorithm/number-theory/interval' },
                        { text: '', link: '/algorithm/number-theory/tree' },
                    ]
                },
                {
                    text: '其他',
                    collapsed: false,
                    items: [
                        { text: '排序算法', link: '/algorithm/others/sorting' },
                        // { text: '', link: '/algorithm/sorting/merge-sort' },
                    ]
                }
            ],

            // 前端栏目的侧边栏
            '/frontend/': [
                {
                    text: 'uniapp',
                    collapsed: false,
                    items: [
                        { text: 'Flex 布局', link: '/frontend/css/flex' }
                    ]
                },
                {
                    text: 'miniApp',
                    collapsed: false,
                    items: [
                        { text: '常用语法', link: '/frontend/css/flex' }
                    ]
                },
                {
                    text: 'Vue',
                    collapsed: false,
                    items: [
                        { text: '响应式原理', link: '/frontend/vue/reactive' },
                        { text: 'Composition API', link: '/frontend/vue/composition-api' }
                    ]
                },
                {
                    text: 'React',
                    collapsed: false,
                    items: [
                        { text: 'Hooks 详解', link: '/frontend/react/hooks' }
                    ]
                },
                {
                    text: '传统H5知识点',
                    collapsed: false,
                    items: [
                        { text: 'Flex 布局', link: '/frontend/css/flex' }
                    ]
                },
                
            ],

            // 后端栏目的侧边栏
            '/backend/': [
                {
                    text: 'SpringCloud',
                    collapsed: false,
                    items: [
                        { text: 'Spring 框架', link: '/backend/nodejs/express' }
                    ]
                },
                {
                    text: 'Node.js',
                    collapsed: false,
                    items: [
                        { text: 'Express 框架', link: '/backend/nodejs/express' }
                    ]
                },
                {
                    text: 'Python',
                    collapsed: false,
                    items: [
                        { text: 'FastApi', link: '/backend/python/fastapi' }
                    ]
                }
            ],

            // 数据库栏目的侧边栏
            '/database/': [
                {
                    text: '流式技术',
                    collapsed: false,
                    items: [
                        { text: "流式技术基础", link: '/database/stream/' },
                        { text: "KafKa 基础", link: '/database/stream/' },
                    ]
                },
                {
                    text: '持久化 数据库',
                    collapsed: false,
                    items: [
                        { text: 'MySQL 基础', link: '/database/mysql/' },
                        { text: 'TdeEngine 基础', link: '/database/mysql/' },
                        { text: 'MINIO 基础', link: '/database/mysql/' },
                    ]
                },
                {
                    text: '内存/缓存 数据库',
                    collapsed: false,
                    items: [
                        { text: 'Redis 基础', link: '/database/redis/basic' }
                    ]
                }
            ]
        },

        // 社交链接（可选）
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ZZQ323' }
        ],

        // 页脚（可选）
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present'
        },

        // 搜索功能（可选）
        search: {
            provider: 'local'
        }
    }
}