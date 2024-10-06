const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const baseConfig = require('./webpack.base.js');
const utils = require('./utils');

const BannerMap = utils.BannerMap;
const parseTampermonkeyBanner = utils.parseTampermonkeyBanner;

const config = {
  name: 'zhihu.answer.detail.page',
  shortName: 'zadp',
  title: '知乎答案详情页',
  desc: '知乎答案详情页，用来截图或分享图',
  webpackFileName: 'webpack.config.zhihu.answer.detail.page.js',
};

const { name } = config;

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: resolve(paths.appUserscripts, `${name}.tsx`),

  output: {
    path: paths.appDist,
    filename: `${name}.js`,
  },

  devServer: {
    static: resolve(paths.appDist, `${name}.js`),
    port: 4300,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      title: '知乎回答详情页面',
    }),
    new webpack.BannerPlugin({
      // 是否仅在入口包中输出 banner 信息
      entryOnly: true,
      // 保持原样
      raw: true,
      banner: () => {
        const bannerList = [
          { type: BannerMap.PURE_TEXT, text: '==UserScript==' },
          { type: BannerMap.MATCH_TAB, variable: 'name', value: config.title },
          { type: BannerMap.MATCH_TAB, variable: 'description', value: config.desc },
          { type: BannerMap.MATCH_TAB, variable: 'author', value: 'general' },
          { type: BannerMap.MATCH_TAB, variable: 'match', value: 'https://www.zhihu.com/*' },
          {
            type: BannerMap.MATCH_TAB,
            variable: 'require',
            value: 'http://file.ikite.top/cdn/html2canvas.min.js',
          },
          { type: BannerMap.MATCH_TAB, variable: 'grant', value: 'none' },
          { type: BannerMap.PURE_TEXT, text: '==UserScript==' },
          { type: BannerMap.EMPTY_LINE, lines: 2 },
        ];
        return parseTampermonkeyBanner(bannerList);
      },
    }),
  ],
});
