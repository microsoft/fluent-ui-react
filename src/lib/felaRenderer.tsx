import { createRenderer } from 'fela'
import felaSanitizeCss from './felaSanitizeCssPlugin'
import felaPluginFallbackValue from 'fela-plugin-fallback-value'
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer'
import felaPluginPrefixer from 'fela-plugin-prefixer'
import rtl from 'fela-plugin-rtl'

import { Renderer } from '../themes/types'

const createRendererConfig = (options: any = {}) => ({
  // https://github.com/stardust-ui/react/issues/782
  // devMode: process.env.NODE_ENV !== 'production',
  devMode: false,
  plugins: [
    // is necessary to prevent accidental style typos
    // from breaking ALL the styles on the page
    felaSanitizeCss({
      skip: ['content'],
    }),

    felaPluginPlaceholderPrefixer(),
    felaPluginPrefixer(),

    // Heads up!
    // This is required after fela-plugin-prefixer to resolve the array of fallback values prefixer produces.
    felaPluginFallbackValue(),
    ...(options.isRtl ? [rtl()] : []),
  ],
  enhancers: [],
  ...(options.isRtl ? { selectorPrefix: 'rtl_' } : {}),
})

export const felaRenderer: Renderer = createRenderer(createRendererConfig())
export const felaRtlRenderer: Renderer = createRenderer(createRendererConfig({ isRtl: true }))

export default felaRenderer
