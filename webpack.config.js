var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function snakeToCamel(s){
    return (s[0].toUpperCase() + s.slice(1)).replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
}

var package = require('./package.json');
var production = (process.env.NODE_ENV === 'production');
var title = snakeToCamel(package.name);
var banner  =
    " " + title + " v" + package.version + "\n" +
    "\n" +
    " "+ package.description +"\n" +
    "\n" +
    " @author "+ package.author.name +" <"+ package.author.email +">\n" +
    " "+ package.homepage +"\n" +
    " Released under the " + package.license + " License.";

var entry = {};
entry[package.name] = [
	'./src/scss/main.scss',
	'./src/js/main.js',
];

var name = '[name]' + (production ? '.min' : '');

module.exports = {

	entry: entry,

	output: {

		path: path.resolve(__dirname, './dist'),

		filename: name + '.js',

		library: title,

		libraryTarget: 'umd',

		umdNamedDefine: true

	},

	module: {

		rules: [


			{

				test: /\.js$/,

				include: __dirname,

				exclude: /node_modules/,

				use: 'babel-loader'

			},

			{

				test: /\.vue$/,

				exclude: /node_modules/,

				use: 'vue-loader'

			},

			{

				test: /\.s[a|c]ss$/,

				use: ExtractTextPlugin.extract({

					use: ['css-loader', 'sass-loader'],

					fallback: 'style-loader'

				})

			}

		]

	},

	resolve: {
	    alias: {
	        'vue$': 'vue/dist/vue.common.js'
	    }
	},

	plugins: [

        new webpack.BannerPlugin(banner),

		new ExtractTextPlugin(name + '.css')

	]

};