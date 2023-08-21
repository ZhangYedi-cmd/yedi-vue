import { expect, test,describe } from 'vitest';
import {parseHTML} from "../src/parser/parseHtml";
import {compileRenderFunction} from '../src/parser/index'


describe('html parser test', async() => {
    test('test html to ast', () => {
       let ast = parseHTML('<div><span>hello yedi</span></div>');
       // console.log(ast)
    })

    test('test ast to virtual dom', () => {
        let virtualDom = compileRenderFunction('<div>{{yedi}} <span>秋天的第一个offer</span>{{leyo}}</div>');
        // console.log(virtualDom)
    })
})