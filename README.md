# tampermonkey-userscripts

油猴脚本构建，可以构建多个脚本。

# 项目目录

```text
├── build         // 构建目录，区分不同的构建脚本
│   ├── config.js // 构建配置
│   ├── paths.js  // 项目里的各种目录和文件的路径
│   ├── utils.js  // 一些辅助的构建工具
│   ├── webpack.base.js   // webpack 基础配置
│   ├── webpack.config.tank.utils.js    // tank.utils 构建配置
│   └── webpack.config.zhihu.answer.detail.page.js    // zhihu.answer.detail.page 构建配置
├── dist          // 构建后的脚本，可以直接导入到油猴中
│   ├── tank.utils.js     // tankUtils 脚本
│   └── zhihu.answer.detail.page.js     // zhihu.answer.detail.page 脚本
├── global.d.ts   // 全局类型定义
├── public        // 公共的目录
│   └── index.html      // 公共的 html 模板
├── userscripts   // 油猴脚本的源代码目录
│   ├── tank.utils.tsx    // tankUtils 的源代码
│   └── zhihu.answer.detail.page.tsx    // 知乎详情页面的源代码
```

# 脚本列表

- tank.utils，通用js工具脚本，各种常用的工具。
- zhihu.answer.detail.page，知乎详情页面的改造，PC 上移除其他的相关内容，移动端移除各种其他信息。
