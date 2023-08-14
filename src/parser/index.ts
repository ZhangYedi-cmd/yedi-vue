/**
 * @file 模版解析引擎
 */

import {ASTNode, parseHTML} from "./parseHtml";

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配花括号 {{  }} 捕获花括号里面的内容

const gen = (node) => {
    // 不是叶子节点
    if (node.type === 1) {
        return generate(node)
    } else {
        // 处理文本节点
        let text = node.text
        // 没有匹配到{{}}
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`
        }
        // 全局模式下，将正则匹配的lastIndex = 0 使其从头开始
        let lastIndex = (defaultTagRE.lastIndex = 0)
        let tokens = []
        let match, index

        while ((match = defaultTagRE.exec(text))) {

        }
    }
}

/**
 * 生成儿子
 */

const genChildren = (ast) => {
    let {children} = ast.children || []
    return `${children.map(item => gen(item)).join(',')}`
}

/**
 * 生成Code _v(div_c('yedi'))
 */

const generate = (ast) => {
    let children = genChildren(ast)
    return ''
}

/**
 * 生成render函数并挂载至vm实例下
 */

const compileRenderFunction = function (template) {
    let ast: ASTNode = parseHTML(template)
    let code = generate(ast)
    code = `with(this) {return ${code}`
    let render = new Function(code)
    return render
}