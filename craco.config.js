const path = require("path")
module.exports = {
	style: {
		sass: {
			loaderOptions: {
				implementation: require("sass"),
				webpackImporter: false
			}
		},
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {}
			}
		}
	},
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src")
		},
		extensions: ["*", ".js", ".jsx", ".json"]
	}
}
