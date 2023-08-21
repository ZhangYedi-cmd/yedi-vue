/**
 * @file 模版解析引擎
 */

import {ASTNode, parseHTML} from "./parseHtml";

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配花括号 {{  }} 捕获花括号里面的内容

const genProps = (attrs) => {
    let tokens = ""
    attrs.map(({key, value}) => {
        if (key === 'style') {
            // color: 'red'; margin-top: '20px';
            let styleMap = {}
            value.split(';').map(style => {
                let [styleKey, styleVal] = style.split(':')
                styleMap[styleKey] = styleVal
            })
            value = styleMap
        }
        tokens += `${key}:${JSON.stringify(value)},`
    })
    return tokens.slice(0, -1)
}


const gen = (node) => {
    // 不是叶子节点
    if (node.type === 1) {
        return codegen(node)
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
        let match
        // 匹配{{}}收集到token数组中
        while ((match = defaultTagRE.exec(text))) {
            let index = match.index
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
        }
        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.splice(lastIndex)))
        }
        return `_v(${tokens.join("+")})`
    }
}

/**
 * 生成儿子
 */

const genChildren = (ast) => {
    let {children} = ast || []
    return `${children.map(item => gen(item)).join(',')}`
}

/**
 * 生成Code _v(div_c('yedi'))
 */

const codegen = (ast) => {
    let children = genChildren(ast)
    return `_c('${ast.tag}'${ast.attrs.length > 0 ? genProps(ast.attrs): ''}${ast.children.length > 0 ? `,${children}`: ''})`
}

/**
 * 生成render函数并挂载至vm实例下
 */

export const compileRenderFunction = function (template) {
    let ast: ASTNode = parseHTML(template)
    let code = codegen(ast)
    code = `with(this){return ${code}}`
    // let render = new Function(code)
    // return render
}