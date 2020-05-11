const path = require('path');
const postCSSPlugins  = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
];
module.exports = {
    entry: './app/assets/scripts/app.js',
    output: {
        filename: "app.bundled.js",
        path: path.resolve(__dirname,"app"),
    },
    
    devServer: {
        //putting below to watch HTML files
        // '**' means to access nested folders
        before: function (app, server){
            server._watch('./app/**/*.html')    
        },
        contentBase: path.join(__dirname, "app"),
        hot: true, 
        //create hot pluggable mode. if we have changed a small block of code then it will not load whole file , it will only load that block of code. This is know as 'Hot Injection'.
        port: 3000,
        host: '0.0.0.0' //By this we can check website in mobile through webpack
    },
    
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader', 
                    'css-loader?url=false',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: postCSSPlugins
                        }
                    }
                ],
            }
        ]
    }
}