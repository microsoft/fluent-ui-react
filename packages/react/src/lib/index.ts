// TODO: remove after switch to Babel
import 'mdn-polyfills/Object.assign'
import 'mdn-polyfills/String.prototype.includes'

import * as commonPropTypes from './commonPropTypes'

export { default as applyAccessibilityKeyHandlers } from './applyAccessibilityKeyHandlers'
export { default as AutoControlledComponent } from './AutoControlledComponent'
export { default as childrenExist } from './childrenExist'
export * from './colorUtils'
export { default as UIComponent } from './UIComponent'
export { felaRenderer, felaRtlRenderer } from './felaRenderer'
export { default as toCompactArray } from './toCompactArray'
export { default as rtlTextContainer } from './rtlTextContainer'

export * from './factories'
export { default as callable } from './callable'
export { default as constants } from './constants'
export { default as getClasses } from './getClasses'
export { default as getElementType } from './getElementType'
export { default as getUnhandledProps } from './getUnhandledProps'
export { default as mergeThemes } from './mergeThemes'
export { default as renderComponent, RenderResultConfig } from './renderComponent'
export { default as getElementProp } from './getElementProp'

export { default as handleRef } from './handleRef'
export {
  htmlImageProps,
  htmlInputAttrs,
  htmlInputEvents,
  htmlInputProps,
  partitionHTMLProps,
} from './htmlPropsUtils'

export { default as isBrowser } from './isBrowser'
export { default as doesNodeContainClick } from './doesNodeContainClick'

export { pxToRem } from './fontSizeUtility'
export { default as createAnimationStyles } from './createAnimationStyles'
export { default as createComponent } from './createStardustComponent'
export { getKindProp } from './getKindProp'
export * from './whatInput'

export * from './commonPropInterfaces'
export { commonPropTypes }
