const { override, fixBabelImports, addLessLoader, overrideDevServer } = require('customize-cra');

const addProxy = () => config => {
  config.proxy = {
    '/structure': {
      target: 'http://localhost:3400',
      changeOrigin: true,
    },
  };
  return config;
};

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true, 
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    })
  ),
  devServer: overrideDevServer(
    addProxy()
  )
};
