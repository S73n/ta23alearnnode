import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Get __dirname from import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(import.meta.dirname, 'dist'), // Corrected path resolution
  },
  devServer: {
    static: {
      directory: path.join(import.meta.dirname, 'public'), // Corrected path resolution
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader', 
          "css-loader", 
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true
              }
            }
          }
        ],
      },
    ],
  },
};
