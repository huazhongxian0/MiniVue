import resolve from '@rollup/plugin-node-resolve';  // 解析 node_modules 中的依赖
import commonjs from '@rollup/plugin-commonjs';     // 将 CommonJS 模块转换为 ES6 模块
import typescript from '@rollup/plugin-typescript'; // 处理 TypeScript 文件
import { terser } from 'rollup-plugin-terser';      // 压缩输出代码
import serve from 'rollup-plugin-serve';             // 提供开发服务器
import livereload from 'rollup-plugin-livereload';   // 支持热更新

export default {
  input: 'packages/reactivity/index.ts', // 入口文件
  output: [
      {
        file: 'packages/reactivity/dist/reactivity.cjs.js', // CommonJS 输出路径
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'packages/reactivity/dist/reactivity.esm.js', // ES Module 输出路径
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'packages/reactivity/dist/reactivity.iife.js', // IIFE 输出路径
        format: 'iife',
        name: 'ReactivityModule',
        sourcemap: true,
        globals: {
          'reactivity': 'ReactivityModule'
        }
      },
  ],
  plugins: [
    resolve(),      // 解析第三方模块
    commonjs(),     // 处理 CommonJS 模块
    typescript(),   // 处理 TypeScript 文件
    terser(),       // 压缩输出代码
    serve({
      open: true,                // 自动打开浏览器
      contentBase: 'packages/reactivity', // 提供静态文件的目录
      port: 2000,                // 端口号
    }),
    livereload('packages')           // 热更新
  ],
  watch: {
    include: 'packages/**', // 监听的文件路径
  },
};
