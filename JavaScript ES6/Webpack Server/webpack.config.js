//Arquivo de configuração do Webpack

module.exports = {
    entry: './main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js',
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