const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./paths');

module.exports = {
  mode: 'development',

  output: {
    filename: 'bundle.js', // 输出文件
    path: paths.appDist,
  },

  devtool: 'inline-source-map',

  devServer: {
    static: paths.appDist, // 开发服务器提供静态文件服务的目录
    port: 3000, // 指定端口号
    host: 'localhost', // 主机名
    hot: true, // 启用热模块替换（HMR）
    compress: true, // 启用 Gzip 压缩
    onListening: (devServer) => {
      const port = devServer.server.address().port;
      console.log(`server is running at http://localhost:${port}`);
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],
};
