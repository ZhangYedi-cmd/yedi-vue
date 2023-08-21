/**
 * @file html 解析
 */

const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i

export type DomAttr = {
    key: string
    value: string | number | boolean
}

export interface ASTNode {
    tag: string
    children: ASTNode[]
    parent: ASTNode
    attrs: DomAttr[]
    type: number
}

export interface TextNode extends ASTNode{
    text: string
}

/**
 * 解析Html
 * @param html
 */
export const parseHTML: any = (html: string) => {
    const stack: ASTNode[] = [],
        TEXT_TYPE = 3

    let currentParent: ASTNode,
        root: ASTNode

    /**
     * 创建AST节点
     */

    const createASTElement = (tag: string, attrs: DomAttr[]) => {
        return {
            tag,
            attrs,
            children: [],
            parent: null
        }
    }

    /**
     * 已经解析的标签置空
     */

    const advance = (n: number) => {
        html = html.substring(n)
    }

    /**
     * 判断是否为一个起始标签
     */

    const parseStartTag = () => {
        const start = html.match(startTagOpen)
        if (start) {
            // <div><div><div/><div/> -> <div><div/><div/> -> <div/><div/>
            const match: any = {
                tag: [start[1]],
                attrs: []
            }
            advance(start[0].length)
            // 如果不是起始标签的结尾 一直匹配下去
            let end, attr
            while (
                !(end = html.match(startTagClose)) &&
                (attr = html.match(attribute))
                ) {
                // 匹配到属性 收集至attr数组中 截取原始的字符串
                advance(attr[0].length)
                match.attrs.push({
                    key: attr[1],
                    value: attr[3] || attr[4] || attr[5] || true,
                })
            }
            if (end) {
                advance(end[0].length)
            }
            return match
        }
        return false
    }

    /**
     * 处理起始标签
     * 创建AST Node
     */

    const start = (tag: string, attrs: []) => {
        const node = createASTElement(tag, attrs)
        if (!root) {
            root = node
        }
        // 栈中有值 建立父子关系
        if (currentParent) {
            node.parent = currentParent
            currentParent.children.push(node)
        }
        // 压入栈中，作为下一个元素的爹元素
        stack.push(node)
        currentParent = node
    }

    /**
     * 处理结尾标签
     */

    const end = (tag) => {
        stack.pop()
        currentParent = stack[stack.length - 1]
    }

    /**
     * 文本节点
     */

    const char = (text: string) => {
        text = text.replace(/\s/g, "");
        text &&
        currentParent.children.push({
            type: TEXT_TYPE,
            parent: currentParent,
            text,
        });
    }

    while (html) {
        let textEnd = html.indexOf("<")
        if (textEnd === 0) {
            // 有可能是<div/>
            const endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
            // <div>
            const startTagMatch = parseStartTag()
            // 匹配到起始标签
            if (startTagMatch) {
                start(startTagMatch.tag,startTagMatch.attrs)
                continue
            }
        }
        // 文本节点
        if (textEnd > 0) {
            let text = html.substring(0, textEnd) // get文本内容
            if (text) {
                char(text)
                advance(text.length)
            }
        }
    }
    return root
}