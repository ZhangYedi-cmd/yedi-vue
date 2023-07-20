import { describe, test } from 'vitest'
import {parseHTML} from "../index";

describe('test html parser', () => {
    test('Compile title', async () => {
        let root = parseHTML('<div></div>')
        console.log(root)
    })
})