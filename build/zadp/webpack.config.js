const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('../paths');
const webpackBaseConfig = require('../webpack.base.js');
const utils = require('../utils');
const commonConfig = require('../common.config');
const config = require('./config.json');

const BannerMap = utils.BannerMap;
const parseTampermonkeyBanner = utils.parseTampermonkeyBanner;
const argv = yargs(hideBin(process.argv)).argv;

const { name } = config;

function zadpWebpackConfig(env) {
  return {
    mode: 'development',

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
      argv.mode === 'development' &&
        new HtmlWebpackPlugin({
          template: paths.appPublicHtml,
        }),
      new webpack.BannerPlugin({
        // 是否仅在入口包中输出 banner 信息
        entryOnly: true,
        // 保持原样
        raw: true,
        banner: () => {
          utils.updateConfigJson(config);
          const bannerList = [
            { type: BannerMap.PURE_TEXT, text: '==UserScript==' },
            { type: BannerMap.MATCH_TAB, variable: 'name', value: config.title },
            { type: BannerMap.MATCH_TAB, variable: 'namespace', value: 'http://tampermonkey.net' },
            { type: BannerMap.MATCH_TAB, variable: 'version', value: config.version },
            { type: BannerMap.MATCH_TAB, variable: 'description', value: config.desc },
            { type: BannerMap.MATCH_TAB, variable: 'author', value: commonConfig.userInfo.author },
            { type: BannerMap.MATCH_TAB, variable: 'match', value: 'https://www.zhihu.com/*' },
            { type: BannerMap.MATCH_TAB, variable: 'license', value: 'MIT' },
            { type: BannerMap.MATCH_TAB, variable: 'grant', value: 'none' },
            { type: BannerMap.PURE_TEXT, text: '==/UserScript==' },
            { type: BannerMap.EMPTY_LINE, lines: 2 },
          ];
          return parseTampermonkeyBanner(bannerList);
        },
      }),
    ].filter(Boolean),
  };
}

module.exports = (env) => {
  return merge(webpackBaseConfig(env), zadpWebpackConfig(env));
};
