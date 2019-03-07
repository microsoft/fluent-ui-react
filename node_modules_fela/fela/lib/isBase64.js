'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase64;
function isBase64(property) {
  return property.substr(0, 5) === 'data:';
}