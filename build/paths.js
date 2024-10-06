const path = require('path');
const fs = require('fs');

// 根目录
const appDirectory = fs.realpathSync(process.cwd());

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

module.exports = {
  // 项目根目录
  appPath: resolveApp('.'),

  // 项目打包的目录
  appDist: resolveApp('dist'),

  // build 目录
  appBuild: resolveApp('build'),
  // build 目录下的 paths.js 文件
  appBuildPaths: resolveApp('build/paths.js'),
  // build 目录下的 webpack.config.js 文件
  appBuildWebpackConfig: resolveApp('build/webpack.config.js'),

  // userscripts 目录
  appUserscripts: resolveApp('userscripts'),

  // public 资源目录
  appPublic: resolveApp('public'),
  // public 目录下的 index.html 文件
  appPublicHtml: resolveApp('public/index.html'),

  // 解析 env 环境变量
  dotenv: resolveApp('.env'),
  // package.json 的路径
  appPackageJson: resolveApp('package.json'),

  // node_modules 的目录路径
  appNodeModules: resolveApp('node_modules'),
  // tsconfig 的路径
  appTsConfig: resolveApp('tsconfig.json'),
  // jsconfig 的路径
  appJsConfig: resolveApp('jsconfig.json'),
  // yarn.lock 文件的路径
  yarnLockFile: resolveApp('yarn.lock'),
};

// 依据根目录，找到相对文件或相对目录
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

function resolveModule(resolveFn, filePath) {
  const extension = moduleFileExtensions.find((extension) => {
    return fs.existsSync(resolveFn(`${filePath}.${extension}`));
  });

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
}
