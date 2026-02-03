// 简单的彩色文字插件
export default function colorTextPlugin(md) {
    // 匹配 {颜色:文字} 语法
    md.inline.ruler.before('emphasis', 'color_text', (state, silent) => {
        const start = state.pos
        const max = state.posMax
        // 检查是否以 { 开头
        if (state.src.charCodeAt(start) !== 0x7B /* { */) {return false}
        // 查找结束的 }
        let pos = start + 1
        let found = false
        let color = ''
        let text = ''
        while (pos < max) {
            const ch = state.src.charCodeAt(pos)
            if (ch === 0x3A /* : */ && !color) {
                // 找到冒号，之前的是颜色
                color = state.src.slice(start + 1, pos)
                pos++
                const textStart = pos
                // 查找结束的 }
                while (pos < max && state.src.charCodeAt(pos) !== 0x7D /* } */) {
                    pos++
                }
                if (pos < max) {
                    text = state.src.slice(textStart, pos)
                    found = true
                    break
                }
            }
            if (ch === 0x7D /* } */) {break}
            pos++
        }
        if (!found || !color || !text) {return false}
        if (!silent) {
            const token = state.push('color_text', 'span', 0)
            token.attrs = [['class', `color-${color}`]]
            token.content = text
        }
        state.pos = pos + 1
        return true
    })

    // 渲染规则
    md.renderer.rules.color_text = (tokens, idx) => {
        const token = tokens[idx]
        const className = token.attrs[0][1]
        const content = token.content
        return `<span class="${className}">${md.utils.escapeHtml(content)}</span>`
    }
}