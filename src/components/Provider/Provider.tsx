import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Provider as RendererProvider, ThemeProvider } from 'react-fela'

import {
  felaRenderer as felaLtrRenderer,
  felaRtlRenderer,
  mergeThemes,
  toCompactArray,
} from '../../lib'
import {
  FontFaces,
  IThemePrepared,
  IThemeInput,
  StaticStyles,
  StaticStyleObject,
  StaticStyle,
  StaticStyleFunction,
} from '../../../types/theme'
import ProviderConsumer from './ProviderConsumer'

export interface IProviderProps {
  fontFaces?: FontFaces
  theme: IThemeInput
  staticStyles?: StaticStyles
  children: React.ReactNode
}

/**
 * The Provider passes the CSS in JS renderer and theme down context.
 */
class Provider extends React.Component<IProviderProps, any> {
  static propTypes = {
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
    theme: PropTypes.shape({
      siteVariables: PropTypes.object,
      componentVariables: PropTypes.object,
      componentStyles: PropTypes.object,
      rtl: PropTypes.bool,
    }),
    staticStyles: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func])),
    ]),
    children: PropTypes.element.isRequired,
  }

  static Consumer = ProviderConsumer

  renderStaticStyles = renderer => {
    // RTL WARNING
    // This function sets static styles which are global and renderer agnostic
    // With current implementation, static styles cannot differ between LTR and RTL
    // @see http://fela.js.org/docs/advanced/StaticStyle.html for details

    const { theme, staticStyles } = this.props

    if (!staticStyles) return

    const renderObject = (object: StaticStyleObject) => {
      _.forEach(object, (style, selector) => {
        renderer.renderStatic(style, selector)
      })
    }

    const staticStylesArr = toCompactArray(staticStyles)

    staticStylesArr.forEach((staticStyle: StaticStyle) => {
      if (typeof staticStyle === 'string') {
        renderer.renderStatic(staticStyle)
      } else if (_.isPlainObject(staticStyle)) {
        renderObject(staticStyle as StaticStyleObject)
      } else if (_.isFunction(staticStyle)) {
        renderObject((staticStyle as StaticStyleFunction)(theme.siteVariables))
      } else {
        throw new Error(
          `staticStyles array must contain CSS strings, style objects, or style functions, got: ${typeof staticStyle}`,
        )
      }
    })
  }

  renderFontFaces = renderer => {
    // RTL WARNING
    // This function sets static styles which are global and renderer agnostic
    // With current implementation, static styles cannot differ between LTR and RTL
    // @see http://fela.js.org/docs/advanced/StaticStyle.html for details

    const { fontFaces } = this.props

    if (!fontFaces) return

    const renderFontObject = font => {
      if (!_.isPlainObject(font)) {
        throw new Error(`fontFaces must be objects, got: ${typeof font}`)
      }
      renderer.renderFont(font.name, font.path, font.style)
    }

    fontFaces.forEach(fontObject => {
      renderFontObject(fontObject)
    })
  }

  componentDidMount() {
    const { theme } = this.props
    const renderer = theme && theme.rtl ? felaRtlRenderer : felaLtrRenderer
    this.renderStaticStyles(renderer)
    this.renderFontFaces(renderer)
  }

  render() {
    const { theme, children } = this.props

    // rehydration disabled to avoid leaking styles between renderers
    // https://github.com/rofrischmann/fela/blob/master/docs/api/fela-dom/rehydrate.md
    return (
      <ProviderConsumer
        render={(incomingTheme: IThemePrepared) => {
          const outgoingTheme: IThemePrepared = mergeThemes(incomingTheme, theme)

          return (
            <RendererProvider renderer={outgoingTheme.renderer} {...{ rehydrate: false }}>
              <ThemeProvider theme={outgoingTheme}>{children}</ThemeProvider>
            </RendererProvider>
          )
        }}
      />
    )
  }
}

export default Provider
