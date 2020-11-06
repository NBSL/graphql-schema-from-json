import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default [
    {
        input: './src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                exports: 'named',
                sourcemap: true
            },
            {
                file: pkg.module,
                format: 'es',
                exports: 'named',
                sourcemap: true
            }
        ],
        plugins: [
            resolve(),
            typescript({
                rollupCommonJSResolveHack: true,
                exclude: '**/tests/**',
                clean: true
            }),
            commonjs({
                namedExports: {
                    'node_modules/inflection/lib/inflection.js': [
                        'camelize',
                        'pluralize',
                        'singularize',
                        'underscore',
                    ],
                }
            }),
        ],
        external: [
            ...Object.keys(pkg.devDependencies || {}),
            ...Object.keys(pkg.peerDependencies || {})
        ]
    }
]