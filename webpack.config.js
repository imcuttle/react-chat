
var path = require('path');
var webpack = require('webpack');
var node_module_dir = path.resolve(__dirname,'node_module');
module.exports = {
    entry: [
        
        'babel-polyfill',
        path.resolve(__dirname, 'app/main.js')
    ],
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
        //new webpack.optimize.CommonsChunkPlugin('react', 'react.js')
    ],
    module:{
        loaders:[
            {
                loader: "babel-loader",   //加载babel模块
                include:[
                    path.resolve(__dirname,'app'),
                ],
                exclude:[
                    /(node_modules|bower_components)/,
                ],
                test:/\.jsx?$/,
                query:{
                    // plugins:['transform-runtime'],
                    presets:['es2015','stage-0','react']
                }
            },
		    {
			    test: /\.less$/,
		    	loader: 'style-loader!css-loader!less-loader'
		    },
		    {
		        test: /\.css$/,
		        loader: 'style-loader!css-loader'
		    },
		    {
		        test: /\.(png|jpg|jpeg)$/,
		        loader: 'url-loader?limit=8192&name=images/[name].[ext]'
		    },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
}