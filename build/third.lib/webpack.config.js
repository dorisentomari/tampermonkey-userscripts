const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
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

const { name, moduleMap } = config;

function thirdLibWebpackConfig(env) {
  const lib = env.lib;
  if (!lib) {
    throw new Error('lib 参数不存在');
  }
  const libObj = require(lib);

  const libItem = moduleMap[lib];
  if (!libItem) {
    throw new Error('lib 配置不存在');
  }

  let version = libObj[libItem.versionField];
  if (!version) {
    version = libItem.version;
  }

  return {
    mode: 'development',

    entry: path.resolve(paths.appUserscripts, `${name}.${lib}.tsx`),

    output: {
      path: paths.appDist,
      filename: `${name}.${lib}.js`,
    },

    devServer: {
      static: path.resolve(paths.appDist, `${name}.js`),
      port: 4400,
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
          const bannerList = [
            { type: BannerMap.PURE_TEXT, text: '==UserScript==' },
            { type: BannerMap.MATCH_TAB, variable: 'name', value: config.title },
            { type: BannerMap.MATCH_TAB, variable: 'namespace', value: 'http://tampermonkey.net' },
            { type: BannerMap.MATCH_TAB, variable: 'lib-name', value: lib },
            { type: BannerMap.MATCH_TAB, variable: 'lib-version', value: version },
            { type: BannerMap.MATCH_TAB, variable: 'version', value: version },
            { type: BannerMap.MATCH_TAB, variable: 'description', value: config.desc },
            { type: BannerMap.MATCH_TAB, variable: 'author', value: commonConfig.userInfo.author },
            { type: BannerMap.MATCH_TAB, variable: 'match', value: '*://*/*' },
            { type: BannerMap.MATCH_TAB, variable: 'grant', value: 'none' },
            { type: BannerMap.MATCH_TAB, variable: 'license', value: 'MIT' },
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
  return merge(webpackBaseConfig(env), thirdLibWebpackConfig(env));
};
