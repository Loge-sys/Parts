const {
  addBabelPlugin,
  override,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra');

function myOverrides(config, env) {
  if (env === 'production') {
    config.output.publicPath = '/frontend/';
    config.devtool = false;
    // config.module.push(
    // 	{
    // 		module: {
    // 			rules: [
    // 				{ test: /\.jpg$/, use: [ "file-loader" ] }
    // 		  	]
    // 		},
    // 		output: {
    // 			publicPath: "/odassi/"
    // 		}
    // 	}
    // );
    // config.module.rules.push(
    // {
    // 	test: /\.module\.css$/,
    // 	use: [
    // 		'style-loader',
    // 		{
    // 			loader: require.resolve('css-loader'),
    // 			options: {
    // 				modules: true,
    // 				importLoaders: 1,
    // 				localIdentName: '[local]___[hash:base64:5]'
    // 			}
    // 		}],
    // 	include: path.resolve('src')
    // })
  }

  return config;
}

module.exports = override(
  myOverrides,
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#ff0000',
    },
  })
);
