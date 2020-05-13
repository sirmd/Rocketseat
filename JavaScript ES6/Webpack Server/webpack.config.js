//Arquivo de configuração do Webpack

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    devServer:{
        contentBase: __dirname + '/public'
    },
    module:{
        rules: [
            {
                test: /\.js$/,    //Regex: arquivos que terminam com .js
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                }
            }
        ]
    }
}