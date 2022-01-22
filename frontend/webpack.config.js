var webpack = require('webpack');
//var CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');



module.exports = {
	//devtool: 'source-map',
	entry: {

		index: './src/index.js'
		//vendor: ['react','react-dom']
	},
	output:{
		//input index.js, and bundle all moudule depended into bundle.js
		path: __dirname + '/static',
		filename: 'bundle.js'
	},
	module:{
		loaders: [
			{
				//every file end with js, run babel-loader on it
				//babel-loader will transforming all none standard js liek JSX, ES2015
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			},
			{
				//npm i -S json-loader, so webpack can read Json file
				test: /\.json$/,
				loader:'json-loader'

			}

		]
	},


	plugins: [
		//new webpack.optimize.UglifyJsPlugin(),

		//new webpack.optimize.OccurenceOrderPlugin(),
		//new CommonsChunkPlugin({name:'vendor', filename:'vendor.bundle.js'}),
		/*new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		})
		*/
	],



};
