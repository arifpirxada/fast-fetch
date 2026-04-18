export default {
    input: 'src/index.js',
    output: {
        dir: "dist",
		format: 'es',
        name: "fast-fetch"
	},
    external: ["react", "react-dom"],
    plugins: [typescript({ tsconfig: "tsconfig.json" })]
};