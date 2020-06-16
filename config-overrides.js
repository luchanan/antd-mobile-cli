const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const { paths } = require('react-app-rewired')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addWebpackAlias ({
    '@': paths.appSrc
  }),
  (config) => {
    config.output.publicPath = 'https://luchanan.github.io/antd-mobile-cli/build/'
    return config
  }
)