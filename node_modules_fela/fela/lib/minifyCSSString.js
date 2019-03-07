'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minifyCSSString;
function minifyCSSString(style) {
  return style.replace(/\s{2,}/g, '');
}