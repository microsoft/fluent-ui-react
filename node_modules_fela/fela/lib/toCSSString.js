'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toCSSString;
function toCSSString(value) {
  if (value.charAt(0) === '"') {
    return value;
  }

  return '"' + value + '"';
}