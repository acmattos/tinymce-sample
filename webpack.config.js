var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

const VENDOR_LIBS = [
   'angular'
];

const config = {
   entry: {
      bundle: './src/index.js', // Our application
      vendor: VENDOR_LIBS       // 3rd Party Libs
   },
   output: {
      path: path.join(__dirname, 'dist'), // Deployment directory
      filename: '[name].[chunkhash].js'   // Output files defined in 'entry'
   },
   module:{
      rules:[
         {
            use: 'babel-loader', // Handle our JS files and convert the code to be compatible to ES2015
            test: /\.js$/,
         },
         {
            use: 'html-loader', // Handle our HTML file
            test: /\.html$/
         },
      ]
   },
   plugins: [
      new CleanWebpackPlugin(
         ['dist'], // Clean dist directory on every build of this application
         {verbose: true}
      ),
      new CopyWebpackPlugin([
      { 
         context: './node_modules/tinymce/', // Copy all TinyMCE related files
         from: '**/*', 
         debug: 'debug'
      }],{
         ignore: [
            // Doesn't copy any files with a txt extension    
            '*.json', '*.txt', '*.md'
        ]
      }),
      new webpack.optimize.CommonsChunkPlugin({
         names: ['vendor', 'manifest'] // Organize app chunks
      }),
      new HtmlWebpackPlugin({
         template: 'src/index.html' // Our main app HTML page
      })
   ]
}
module.exports = config;