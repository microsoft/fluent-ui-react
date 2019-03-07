'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _felaBindings = require('fela-bindings');

var _FelaTheme = require('./FelaTheme');

var _FelaTheme2 = _interopRequireDefault(_FelaTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _felaBindings.withThemeFactory)(_react.createElement, _FelaTheme2.default);