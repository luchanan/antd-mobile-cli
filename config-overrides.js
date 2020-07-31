const { override, fixBabelImports, addWebpackAlias, addWebpackPlugin, addBundleVisualizer, addLessLoader, setWebpackPublicPath, addWebpackModuleRule, overrideDevServer, addPostcssPlugins} = require('customize-cra')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReplacePlugin = require('webpack-plugin-replace')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const rewireHtmlWebpackPlugin = require('react-app-rewire-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const dayjs = require('dayjs')
const webpack = require('webpack')
const { paths } = require('react-app-rewired')
const path = require('path')
const fs = require('fs')
const select = fs.readFileSync('./conf/select.js', 'utf8')
let timeStamp = process.env.npm_config_appversion || dayjs().format('YYMMDD')
const removeConsole = () => {
  return (config) => {
    if(config.optimization.minimizer){
      config.optimization.minimizer.forEach( (minimizer) => {
        if( minimizer.constructor.name === 'TerserPlugin'){
          // minimizer.options.terserOptions.compress.drop_console = true // 包括log，error, warn等
          minimizer.options.terserOptions.compress.pure_funcs = ['console.log']
        }
      })       
    }
    return config;
  }
}
const addWebpackPlugins = (plugins = []) => (config) => {
  for (let val of plugins) {
    config.plugins.push(val)
  }
  return config
}
const replaceOutputName = () => (config) => {
  config.output.filename = 'static/js/[name].js'; // static/js/[name].[contenthash:8].js
  config.output.chunkFilename = 'static/js/[name].chunk.js'; // static/js/[name].[contenthash:8].chunk.js
  // change MiniCssExtractPlugin
  config.plugins = config.plugins.filter(
    p => p.constructor.name !== 'MiniCssExtractPlugin',
  );
  config.plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'static/css/[name].css',
    chunkFilename: 'static/css/[name].chunk.css'
  }));
  // Media and Assets Overrides
  config.module.rules[2].oneOf = config.module.rules[2].oneOf.map((one) => {
    if (one.options && one.options.name) {
      one.options.name = 'static/media/[name].[ext]';
    }
    return one;
  });
  // ②less文件url路径
  config.module.rules[2].oneOf[7].use[0].options = {...config.module.rules[2].oneOf[7].use[0].options, publicPath: '../../'}
  // ②css文件url路径
  config.module.rules[2].oneOf[3].use[0].options = {...config.module.rules[2].oneOf[3].use[0].options, publicPath: '../../'}
  console.log(config.module.rules[2])
  // 单独设置
  // config.module.rules[2].oneOf.splice(0,1,{
  //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  //   use: [{
  //       loader: require.resolve('url-loader'),
  //       options: {
  //         limit: 10000,
  //         name: 'static/images/[name].[hash:8].[ext]'
  //       }
  //   }]
  // });
  return config;
}
const removeHtmlWebpackPlugin = () => (config) => {
  // copy原来的配置， 再删除, react-app-rewire-html-webpack-plugin代替此处
  const htmlWebpackPluginOptions = config.plugins.find(
    plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
  )
  htmlWebpackPluginOptions.options = {...htmlWebpackPluginOptions.options, ...{
    ejs: select
  }}
  return config
  // htmlWebpackPluginOptions = config.plugins[index].options
  // console.log(htmlWebpackPluginOptions)
  // config.plugins.splice(index, 1)
}
module.exports = {
  webpack: override(
    // 废弃， 采用②
    // ①
    // process.env.NODE_ENV === 'production' && addWebpackModuleRule(
    //   {
    //     test: /\.css$/,
    //     use: [
    //       {
    //         loader: MiniCssExtractPlugin.loader,
    //         options: {
    //           publicPath: '../'
    //         }
    //       },
    //       'css-loader'
    //     ]
    //   }
    // ),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css'
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'hack': `true; @import "~@/assets/less/var.less";`
        }
      }
    }),
    addPostcssPlugins([
      require('postcss-px-to-viewport')({
        viewportWidth: 375,
        exclude: /(\/|\\)(node_modules)(\/|\\)/
      })
    ]),
    addWebpackAlias ({
      '@': paths.appSrc
    }),
    
    addWebpackPlugins([
      new webpack.DefinePlugin({
        'APPVERSION': timeStamp
      }),
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: 'public/index.html',
      //   inject: true,
      //   title: 'add title',
      //   ejs: select
      // }),
      new ReplacePlugin({
        values: {
          'CSSREPLACE': 'px'
        }
      }),
      new CopyWebpackPlugin({patterns: [{from: 'conf/**'}]}),
      process.env.NODE_ENV === 'production' ? new FileManagerPlugin({
        onEnd: {
          mkdir: [`./tar`],
          archive: [
            {
              source: `${path.resolve(__dirname, 'build')}`,
              destination: `./tar/build.tar.gz`,
              format: 'tar',
              options: {
                gzip: true,
                gzipOptions: {
                  level: 9
                },
                globOptions: {
                  nomount: true
                }
              }
            }
          ]
        }
      }) : () => {} // 防止npm run start错误
    ]),
    // process.env.NODE_ENV === 'production' && addWebpackPlugin(
    //   new ReplaceInFileWebpackPlugin([{
    //     dir: paths.appBuild,
    //     test: [/\.css$/, /\.js$/],
    //     rules: [{
    //       search: /"JSREPLACE"/g,
    //       replace: 'window.REPLACED'
    //     }]
    //   }])
    // ),
    (config, env) => {
      rewireHtmlWebpackPlugin(config, env, {
        title: 'add title',
        ejs: select
      })
      // config.output.publicPath = 'https://luchanan.github.io/antd-mobile-cli/build/'
      return config
    },
    // removeHtmlWebpackPlugin(),
    removeConsole(),
    addBundleVisualizer({}, true),
    replaceOutputName(),
    process.env.REACT_APP_DETAIL_ENV === 'prod' ?setWebpackPublicPath('https://luchanan.github.io/antd-mobile-cli/build/'): () => {}
  ),
  //  for development or production.
  paths: function(paths, env) {
    paths.appBuild = path.resolve(__dirname, 'build')
    return paths;
  },
  devServer: overrideDevServer(
    (config, env) => {
      return config
    }
  )
}