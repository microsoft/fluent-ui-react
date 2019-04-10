import { IStyle } from 'fela'
import { render } from 'fela-dom'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { RendererProvider, ThemeProvider } from 'react-fela'

import {
  felaRenderer as felaLtrRenderer,
  felaRtlRenderer,
  isBrowser,
  mergeThemes,
  ChildrenComponentProps,
} from '../../lib'

import {
  ThemePrepared,
  ThemeInput,
  StaticStyleObject,
  StaticStyle,
  StaticStyleFunction,
  FontFace,
} from '../../themes/types'

import ProviderConsumer from './ProviderConsumer'
import { mergeSiteVariables } from '../../lib/mergeThemes'
import ProviderBox from './ProviderBox'
import { Extendable } from '../../types'

export interface ProviderProps extends ChildrenComponentProps {
  theme: ThemeInput
}

/**
 * The Provider passes the CSS in JS renderer and theme to your components.
 */
class Provider extends React.Component<Extendable<ProviderProps>> {
  static displayName = 'Provider'

  static propTypes = {
    theme: PropTypes.shape({
      siteVariables: PropTypes.object,
      componentVariables: PropTypes.object,
      componentStyles: PropTypes.object,
      rtl: PropTypes.bool,
      fontFaces: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          paths: PropTypes.arrayOf(PropTypes.string),
          style: PropTypes.shape({
            fontStretch: PropTypes.string,
            fontStyle: PropTypes.string,
            fontVariant: PropTypes.string,
            fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            localAlias: PropTypes.string,
            unicodeRange: PropTypes.string,
          }),
        }),
      ),
      staticStyles: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
      ),
      animations: PropTypes.object,
    }),
    children: PropTypes.node.isRequired,
  }

  static Consumer = ProviderConsumer
  static Box = ProviderBox

  staticStylesRendered: boolean = false

  static _topLevelFelaRenderer = undefined

  private get topLevelFelaRenderer() {
    if (!Provider._topLevelFelaRenderer) {
      Provider._topLevelFelaRenderer = this.props.theme.rtl ? felaRtlRenderer : felaLtrRenderer
    }
    return Provider._topLevelFelaRenderer
  }

  renderStaticStyles = (mergedTheme: ThemePrepared) => {
    // RTL WARNING
    // This function sets static styles which are global and renderer agnostic.
    // Top level fela renderer (the first one rendered) is used to render static styles.
    // With current implementation, static styles cannot differ between LTR and RTL
    // @see http://fela.js.org/docs/advanced/StaticStyle.html for details

    const { siteVariables } = mergedTheme
    const { staticStyles } = this.props.theme

    if (!staticStyles) return

    const renderObject = (object: StaticStyleObject) => {
      _.forEach(object, (style, selector) => {
        this.topLevelFelaRenderer.renderStatic(style as IStyle, selector)
      })
    }

    staticStyles.forEach((staticStyle: StaticStyle) => {
      if (typeof staticStyle === 'string') {
        this.topLevelFelaRenderer.renderStatic(staticStyle)
      } else if (_.isPlainObject(staticStyle)) {
        renderObject(staticStyle as StaticStyleObject)
      } else if (_.isFunction(staticStyle)) {
        const preparedSiteVariables = mergeSiteVariables(siteVariables)
        renderObject((staticStyle as StaticStyleFunction)(preparedSiteVariables))
      } else {
        throw new Error(
          `staticStyles array must contain CSS strings, style objects, or style functions, got: ${typeof staticStyle}`,
        )
      }
    })
  }

  renderFontFaces = () => {
    // RTL WARNING
    // This function sets static styles which are global and renderer agnostic.
    // Top level fela renderer (the first one rendered) is used to render static styles.
    // With current implementation, static styles cannot differ between LTR and RTL
    // @see http://fela.js.org/docs/advanced/StaticStyle.html for details

    const { fontFaces } = this.props.theme

    if (!fontFaces) return

    const renderFontObject = (font: FontFace) => {
      if (!_.isPlainObject(font)) {
        throw new Error(`fontFaces must be objects, got: ${typeof font}`)
      }
      this.topLevelFelaRenderer.renderFont(font.name, font.paths, font.style)
    }

    fontFaces.forEach((font: FontFace) => {
      renderFontObject(font)
    })
  }

  componentDidMount() {
    this.renderFontFaces()
  }

  render() {
    const { theme, children, ...unhandledProps } = this.props

    // rehydration disabled to avoid leaking styles between renderers
    // https://github.com/rofrischmann/fela/blob/master/docs/api/fela-dom/rehydrate.md
    return (
      <ProviderConsumer
        render={(incomingTheme: ThemePrepared) => {
          const outgoingTheme: ThemePrepared = mergeThemes(incomingTheme, theme)

          // Heads up!
          // We should call render() to ensure that a subscription for DOM updates was created
          // https://github.com/stardust-ui/react/issues/581
          if (isBrowser()) render(outgoingTheme.renderer)
          this.renderStaticStylesOnce(outgoingTheme)

          const rtlProps: { dir?: 'rtl' | 'ltr' } = {}
          // only add dir attribute for top level provider or when direction changes from parent to child
          if (
            !incomingTheme ||
            (incomingTheme.rtl !== outgoingTheme.rtl && _.isBoolean(outgoingTheme.rtl))
          ) {
            rtlProps.dir = outgoingTheme.rtl ? 'rtl' : 'ltr'
          }

          return (
            <RendererProvider renderer={outgoingTheme.renderer} {...{ rehydrate: false }}>
              <ThemeProvider theme={outgoingTheme}>
                <ProviderBox {...unhandledProps} {...rtlProps}>
                  {children}
                </ProviderBox>
              </ThemeProvider>
            </RendererProvider>
          )
        }}
      />
    )
  }

  renderStaticStylesOnce = (mergedTheme: ThemePrepared) => {
    const { staticStyles } = this.props.theme
    if (!this.staticStylesRendered && staticStyles) {
      this.renderStaticStyles(mergedTheme)
      this.staticStylesRendered = true
    }
  }
}

export default Provider
