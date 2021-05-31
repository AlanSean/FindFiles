const path = require('path');

function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    let externals = {};
    for (let p in dependencies) {
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}
module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },
    target: 'node',
    devtool: 'source-map',// 打包出的js文件是否生成map文件（方便浏览器调试）
    mode: 'production',
    entry: {
      'main': './src/index.ts',
    },
    output: {
        filename: '[name].js',// 生成的fiename需要与package.json中的main一致
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
    },
    module: {
      rules: [
          {
              test: /\.tsx?$/,
              use: [
                  {
                      loader: 'ts-loader',
                      options: {
                          // 指定特定的ts编译配置，为了区分脚本的ts配置
                          configFile: path.resolve(__dirname, './src/tsconfig.json'),
                      },
                  },
              ],
              exclude: /node_modules/,
          },
      ],
    },
    externals: _externals,
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    },
};