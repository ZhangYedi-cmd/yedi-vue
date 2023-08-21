import { expect, test,describe } from 'vitest';
import {parseHTML} from "../src/parser/parseHtml";


describe('html parser test', async() => {
    test('init', () => {
        console.log(parseHTML('<div><span>hello yedi</span></div>'));
    })
})