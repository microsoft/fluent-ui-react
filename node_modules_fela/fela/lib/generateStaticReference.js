'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateStaticReference;
function generateStaticReference(style, selector) {
  if (typeof style === 'string') {
    return style;
  }

  if (selector) {
    return selector + JSON.stringify(style);
  }

  return '';
}