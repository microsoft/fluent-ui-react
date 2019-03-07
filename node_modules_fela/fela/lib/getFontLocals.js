'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFontLocals;
function getFontLocals(localAlias) {
  if (typeof localAlias === 'string') {
    return [localAlias];
  }

  if (Array.isArray(localAlias)) {
    return localAlias.slice();
  }

  return [];
}