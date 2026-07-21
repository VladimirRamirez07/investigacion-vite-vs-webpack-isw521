const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Punto de entrada: Webpack empieza a construir el grafo desde aquí
  entry: './src/main.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        // Loader para procesar archivos CSS
        // A diferencia de Vite, Webpack necesita loaders explícitos
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // Webpack genera el HTML e inyecta el bundle automáticamente
      template: './src/index.html',
    }),
  ],

  devServer: {
    port: 8080,
    hot: true,
    open: true,
  },
};