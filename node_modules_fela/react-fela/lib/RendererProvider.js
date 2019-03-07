'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _felaBindings = require('fela-bindings');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _context = require('./context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _felaBindings.RendererProviderFactory)(_react.Component, _context.RendererContext, _react.createElement, function (children) {
  return _react.Children.only(children);
}, {
  propTypes: {
    renderer: _propTypes2.default.object.isRequired,
    rehydrate: _propTypes2.default.bool.isRequired
  },
  defaultProps: {
    rehydrate: true
  }
});