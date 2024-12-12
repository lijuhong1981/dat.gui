import resolve from 'rollup-plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import sass from 'rollup-plugin-sass';
import uglify from 'rollup-plugin-uglify';

function output(file, format, sourcemap) {
    return {
        input: './src/dat/index.js',
        output: {
            name: 'dat',
            file,
            format,
            sourcemap,
        },
        plugins: [
            resolve(),
            sass({
                insert: true,
                output: 'build/dat.gui.css',
                options: { outputStyle: 'compressed' }
            }),
            !sourcemap ? cleanup() : undefined,
            !sourcemap ? uglify({
                output: {
                    // Preserve license commenting in minified build.
                    comments: function (node, comment) {
                        return comment.type === 'comment2';
                    }
                }
            }) : undefined,
        ]
    }
};

export default [
    output('./build/dat.gui.js', 'umd', true),
    output('./build/dat.gui.min.js', 'umd', false),
    output('./build/dat.gui.esm.js', 'esm', true),
    output('./build/dat.gui.esm.min.js', 'esm', false),
]