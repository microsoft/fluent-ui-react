'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineRules;

var _assignStyle = require('css-in-js-utils/lib/assignStyle');

var _assignStyle2 = _interopRequireDefault(_assignStyle);

var _arrayReduce = require('fast-loops/lib/arrayReduce');

var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function resolveRule(rule, props, renderer) {
  if (Array.isArray(rule)) {
    return resolveRule(combineRules.apply(undefined, _toConsumableArray(rule)), props, renderer);
  }

  if (typeof rule === 'function') {
    return rule(props, renderer);
  }

  return rule;
}

function combineRules() {
  for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
    rules[_key] = arguments[_key];
  }

  return function (props, renderer) {
    return (0, _arrayReduce2.default)(rules, function (style, rule) {
      return (0, _assignStyle2.default)(style, resolveRule(rule, props, renderer));
    }, {});
  };
}