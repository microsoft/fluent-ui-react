import { createRenderer } from 'fela'
import felaSanitizeCss from './felaSanitizeCssPlugin'
import felaPluginFallbackValue from 'fela-plugin-fallback-value'
import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer'
import felaPluginPrefixer from 'fela-plugin-prefixer'
import rtl from 'fela-plugin-rtl'

import { Renderer } from '../themes/types'

// Blacklist contains a list of classNames that are used by FontAwesome
// https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
const blacklistedClassNames = ['fa', 'fas', 'far', 'fal', 'fab']

const filterClassName = (className: string): boolean =>
  className.indexOf('ad') === -1 && blacklistedClassNames.indexOf(className) === -1

const createRendererConfig = (options: any = {}) => ({
  devMode: process.env.NODE_ENV !== 'production',
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
  filterClassName,
  enhancers: [],
  ...(options.isRtl ? { selectorPrefix: 'rtl_' } : {}),
  ...(options.rendererId ? { rendererId: options.rendererId } : {}),
})

// { rendererId: 'default' } is a temporary workaround for https://github.com/stardust-ui/react/issues/948#issuecomment-466404630
export const felaRenderer: Renderer = createRenderer(
  createRendererConfig({ rendererId: 'default' }),
)
export const felaRtlRenderer: Renderer = createRenderer(
  createRendererConfig({ isRtl: true, rendererId: 'rtl' }),
)

export default felaRenderer
