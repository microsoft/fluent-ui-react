'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Provider;

var _react = require('react');

var _RendererProvider = require('./RendererProvider');

var _RendererProvider2 = _interopRequireDefault(_RendererProvider);

var _deprecate = require('./_deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Provider(props) {
  (0, _deprecate2.default)('Importing `Provider` from react-fela is deprecated. Import `RendererProvider` instead.\nSee http://fela.js.org/docs/api/bindings/renderer-provider');

  return (0, _react.createElement)(_RendererProvider2.default, props);
}