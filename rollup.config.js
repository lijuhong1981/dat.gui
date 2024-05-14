import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import sass from 'rollup-plugin-sass';

const output = (file, format, sourcemap) => ({
    input: './src/dat/index.js',
    output: {
        name: 'dat.gui',
        file,
        format,
        sourcemap,
    },
    plugins: [
        nodeResolve({
            browser: true,
            preferBuiltins: false
        }),
        sass({
            insert: true,
            output: 'build/dat.gui.css',
            options: { outputStyle: 'compressed' }
        }),
        !sourcemap ? cleanup() : undefined,
        !sourcemap ? terser() : undefined,
    ]
});

export default [
    output('./build/dat.gui.js', 'umd', true),
    output('./build/dat.gui.min.js', 'umd', false),
    output('./build/dat.gui.esm.js', 'esm', true),
    output('./build/dat.gui.esm.min.js', 'esm', false),
]