import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from "rollup-plugin-terser";

export default {
    input: './index.ts',
    output: [
        {
            file: './dist/main.cjs.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: './dist/main.esm.js',
            format: 'esm',
            sourcemap: true,
        }
    ],
    treeshake: true,
    plugins: [
        typescript(),
        commonjs(),
        resolve(),
        terser()
    ],
}
