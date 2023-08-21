import { expect, test,describe } from 'vitest';
import {parseHTML} from "../src/parser/parseHtml";


describe('html parser test', async() => {
    test('test html to ast', () => {
       let ast = parseHTML('<div><span>hello yedi</span></div>');
       console.log(ast)
    })

    test('test ast to virtual dom', () => {
        let ast = parseHTML('<div><span>hello yedi</span></div>');
        console.log(ast)
    })
})