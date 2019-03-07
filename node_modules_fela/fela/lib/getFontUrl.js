'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFontUrl;

var _isBase = require('./isBase64');

var _isBase2 = _interopRequireDefault(_isBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFontUrl(src) {
  if ((0, _isBase2.default)(src)) {
    return src;
  }

  return '\'' + src + '\'';
}