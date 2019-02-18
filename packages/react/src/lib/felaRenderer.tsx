import { createRenderer } from 'fela'
import felaSanitizeCss from './felaSanitizeCssPlugin'
import felaPluginFallbackValue from 'fela-plugin-fallback-value'
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer'
import felaPluginPrefixer from 'fela-plugin-prefixer'
import rtl from 'fela-plugin-rtl'

import { Renderer } from '../themes/types'

const createRendererConfig = (options: any = {}) => ({
  devMode: false, // process.env.NODE_ENV !== 'production',
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
  ...(options.rendererId ? { rendererId: options.rendererId } : {}),
})

export const felaRenderer: Renderer = createRenderer(createRendererConfig())
export const felaRtlRenderer: Renderer = createRenderer(
  createRendererConfig({ isRtl: true, rendererId: 'rtl' }),
)

export default felaRenderer
