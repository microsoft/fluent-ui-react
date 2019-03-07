function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import assignStyle from 'css-in-js-utils/lib/assignStyle';
import arrayReduce from 'fast-loops/lib/arrayReduce';

function resolveRule(rule, props, renderer) {
  if (Array.isArray(rule)) {
    return resolveRule(combineRules.apply(undefined, _toConsumableArray(rule)), props, renderer);
  }

  if (typeof rule === 'function') {
    return rule(props, renderer);
  }

  return rule;
}

export default function combineRules() {
  for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
    rules[_key] = arguments[_key];
  }

  return function (props, renderer) {
    return arrayReduce(rules, function (style, rule) {
      return assignStyle(style, resolveRule(rule, props, renderer));
    }, {});
  };
}