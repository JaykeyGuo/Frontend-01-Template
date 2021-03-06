var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  collecting() {
    this.log('collecting');
  }
  creating() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { title: 'generate-app' }
    );
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('lib/createElement.js')
    );
    this.fs.copyTpl(
      this.templatePath('gusture.js'),
      this.destinationPath('lib/gusture.js')
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
    )
    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js'),
    )
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc'),
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
    )
    this.npmInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      '@babel/core',
      '@babel/register',
      '@babel/preset-env',
      '@babel/plugin-transform-react-jsx',
      'babel-loader',
      'mocha',
      'nyc',
      '@istanbuljs/nyc-config-babel',
      'babel-plugin-istanbul',
      'html-webpack-plugin'
    ], { 'save-dev': true });
  }
}