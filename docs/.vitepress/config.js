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
            { text: '算法', link: '/algorithm/' ,activeMatch: '/algorithm/'},
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
                        { text: '数组', link: '/algorithm/data-structure/array' },
                        { text: '链表', link: '/algorithm/data-structure/linked-list' },
                        { text: '树', link: '/algorithm/data-structure/tree' }
                    ]
                },
                {
                    text: '排序算法',
                    collapsed: false,
                    items: [
                        { text: '快速排序', link: '/algorithm/sorting/quick-sort' },
                        { text: '归并排序', link: '/algorithm/sorting/merge-sort' }
                    ]
                }
            ],

            // 前端栏目的侧边栏
            '/frontend/': [
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
                    text: 'CSS',
                    collapsed: false,
                    items: [
                        { text: 'Flex 布局', link: '/frontend/css/flex' }
                    ]
                }
            ],

            // 后端栏目的侧边栏
            '/backend/': [
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
                        { text: 'Django 入门', link: '/backend/python/django' }
                    ]
                }
            ],

            // 数据库栏目的侧边栏
            '/database/': [
                {
                    text: 'MySQL',
                    collapsed: false,
                    items: [
                        { text: 'MySQL 基础', link: '/database/mysql/' }
                    ]
                },
                {
                    text: 'Redis',
                    collapsed: false,
                    items: [
                        { text: 'Redis 基础', link: '/database/redis/basic' }
                    ]
                }
            ]
        },

        // 社交链接（可选）
        socialLinks: [
            { icon: 'github', link: 'https://github.com/your-username' }
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