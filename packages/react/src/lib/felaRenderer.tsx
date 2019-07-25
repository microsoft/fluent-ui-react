import { createRenderer } from 'fela'
import felaPluginEmbedded from 'fela-plugin-embedded'
import felaPluginFallbackValue from 'fela-plugin-fallback-value'
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer'
import felaPluginPrefixer from 'fela-plugin-prefixer'
import felaPluginRtl from 'fela-plugin-rtl'

import { Renderer } from '../themes/types'
import felaDisableAnimationsPlugin from './felaDisableAnimationsPlugin'
import felaExpandCssShorthandsPlugin from './felaExpandCssShorthandsPlugin'
import felaInvokeKeyframesPlugin from './felaInvokeKeyframesPlugin'
import felaSanitizeCss from './felaSanitizeCssPlugin'

import * as _ from 'lodash'
import { processStyleWithPlugins } from 'fela-utils'


let felaDevMode = false

try {
  felaDevMode = !!window.localStorage.felaDevMode
} catch {
}

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  if (felaDevMode) {
    /* eslint-disable-next-line no-console */
    console.warn(
      [
        '@stardust-ui/react:',
        'You are running Fela in development mode and this can cause performance degrades.',
        'To disable it please paste `delete window.localStorage.felaDevMode` to your browsers console and reload current page.',
      ].join(' '),
    )
  } else {
    /* eslint-disable-next-line no-console */
    console.warn(
      [
        '@stardust-ui/react:',
        'You are running Fela in production mode.',
        'This limits your ability to edit styles in browsers development tools.',
        'To enable development mode please paste `window.localStorage.felaDevMode = true` to your browsers console and reload the page.',
      ].join(' '),
    )
  }
}

// Blacklist contains a list of classNames that are used by FontAwesome
// https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
const blacklistedClassNames = ['fa', 'fas', 'far', 'fal', 'fab']

const filterClassName = (className: string): boolean =>
  className.indexOf('ad') === -1 && blacklistedClassNames.indexOf(className) === -1

const rendererConfig = {
  devMode: felaDevMode,
  filterClassName,
  enhancers: [],
  plugins: [
    // is necessary to prevent accidental style typos
    // from breaking ALL the styles on the page
    felaSanitizeCss({
      skip: ['content', 'keyframe'],
    }),

    felaPluginPlaceholderPrefixer(),
    felaPluginPrefixer(),

    // Heads up!
    // This is required after fela-plugin-prefixer to resolve the array of fallback values prefixer produces.
    felaPluginFallbackValue(),

    // felaExpandCssShorthandsPlugin(),
    felaDisableAnimationsPlugin(),
    felaInvokeKeyframesPlugin(),
    felaPluginEmbedded(),

    felaPluginRtl(),
  ],
}

const felaRenderer: Renderer = createRenderer(rendererConfig)

window.debugDefinitions = {}
window.debugEl = (el: HTMLElement) => {
  const result = {}

  el.classList.forEach(className => {
    if (window.debugDefinitions[className]) {
      result[window.debugDefinitions[className].name] = {
        variable: window.debugDefinitions[className].variable,
        value: window.debugDefinitions[className].value,
        file: window.debugDefinitions[className].file,
      }
    }
  })

  return JSON.stringify(result, null, 2)
}

const _renderStyleToClassNames = (style, classes) => {
  return felaRenderer._renderStyleToClassNames(style) + ' ' +classes
}

felaRenderer._renderStyle = (style, props) => {
  const debugClasses = []

  Object.keys(style).forEach(key => {
    if (style[key].__STARDUST_DEBUG) {
      console.warn(style[key])
      const id = _.uniqueId('sd-')

      window.debugDefinitions[id] = style[key]
      debugClasses.push(id)

      style[key] = style[key].value
    }
  })

  const processedStyle = processStyleWithPlugins(
    felaRenderer,
    style,
    'RULE',
    props
  )
console.log(debugClasses.join(' '))
  return _renderStyleToClassNames(processedStyle, debugClasses.join(' ')).slice(1)
}

export default felaRenderer
