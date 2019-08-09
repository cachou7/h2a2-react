module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader?modules=true' ]
            },
            {
  				test: /\.(png|svg|jpg|gif|jpeg)$/,
  				use: ["file-loader"]
			}
        ]
    }
}