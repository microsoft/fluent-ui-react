'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFela;

var _react = require('react');

var _fela = require('fela');

var _context = require('./context');

function useFela() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var renderer = (0, _react.useContext)(_context.RendererContext);
  var theme = (0, _react.useContext)(_context.ThemeContext) || {};

  if (!renderer) {
    throw new Error('The "useFela" hook can only be used  inside a "RendererProvider"');
  }

  var propsWithTheme = { theme: theme };
  if (props) Object.assign(propsWithTheme, props);

  function css() {
    return renderer.renderRule(_fela.combineRules.apply(undefined, arguments), propsWithTheme);
  }

  return {
    renderer: renderer,
    theme: theme,
    css: css
  };
}
// $FlowFixMe