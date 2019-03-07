'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyFontFace;

var _cssifyObject = require('css-in-js-utils/lib/cssifyObject');

var _cssifyObject2 = _interopRequireDefault(_cssifyObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssifyFontFace(fontFace) {
  return '@font-face{' + (0, _cssifyObject2.default)(fontFace) + '}';
}