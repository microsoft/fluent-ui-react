'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSafeClassName;
function isSafeClassName(className) {
  return className.indexOf('ad') === -1;
}