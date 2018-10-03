import { createRenderer } from 'fela'
import felaSanitizeCss from './felaSanitizeCssPlugin'
import felaExpandCssShorthandsPlugin from './felaExpandCssShorthandsPlugin'
import felaPluginFallbackValue from 'fela-plugin-fallback-value'
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer'
import felaPluginPrefixer from 'fela-plugin-prefixer'
import rtl from 'fela-plugin-rtl'

import { IRenderer } from '../../types/theme'

const createRendererConfig = (options: any = {}) => ({
  plugins: [
    felaExpandCssShorthandsPlugin(),

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

export const felaRenderer: IRenderer = createRenderer(createRendererConfig())
export const felaRtlRenderer: IRenderer = createRenderer(createRendererConfig({ isRtl: true }))

export default felaRenderer
