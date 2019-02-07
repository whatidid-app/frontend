/* config-overrides.js */
const { override, addBabelPlugins, addBabelPresets } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins('polished'),
  ...addBabelPresets('@emotion/babel-preset-css-prop')
);
