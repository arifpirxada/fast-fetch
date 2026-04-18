export default {
    input: 'src/index.js',
    output: {
        dir: "dist",
		format: 'es',
        name: "fast-fetch"
	},
    plugins: [typescript({ tsconfig: "tsconfig.json" })]
};