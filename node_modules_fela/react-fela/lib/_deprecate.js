'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deprecate;
var cache = {};
var isProd = process.env.NODE_ENV === 'production';

function deprecate(message) {
  if (!isProd && !cache[message]) {
    console.warn(message);
    cache[message] = true;
  }
}