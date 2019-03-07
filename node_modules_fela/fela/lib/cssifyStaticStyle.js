'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyStaticStyle;

var _cssifyObject = require('css-in-js-utils/lib/cssifyObject');

var _cssifyObject2 = _interopRequireDefault(_cssifyObject);

var _felaUtils = require('fela-utils');

var _minifyCSSString = require('./minifyCSSString');

var _minifyCSSString2 = _interopRequireDefault(_minifyCSSString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssifyStaticStyle(staticStyle, renderer) {
  if (typeof staticStyle === 'string') {
    return (0, _minifyCSSString2.default)(staticStyle);
  }

  var processedStaticStyle = (0, _felaUtils.processStyleWithPlugins)(renderer, staticStyle, _felaUtils.STATIC_TYPE);

  return (0, _cssifyObject2.default)(processedStaticStyle);
}