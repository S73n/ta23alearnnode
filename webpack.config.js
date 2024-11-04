import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Get __dirname from import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), // Corrected path resolution
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Corrected path resolution
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // Regex to match .css files
        use: ['style-loader', 'css-loader'], // Loaders to apply
      },
      // other loaders can go here
    ],
  },
};
