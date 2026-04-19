import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        dir: "dist",
        format: 'es',
        name: "fast-fetch"
    },
    plugins: [typescript({ tsconfig: "tsconfig.json" })]
};