import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Provider as RendererProvider, ThemeProvider } from 'react-fela'

import { felaRenderer as felaLtrRenderer, mergeThemes } from '../../lib'
import {
  IThemePrepared,
  IThemeInput,
  StaticStyleObject,
  StaticStyle,
  StaticStyleFunction,
  IFontFace,
} from '../../../types/theme'
import ProviderConsumer from './ProviderConsumer'
import { mergeSiteVariables } from '../../lib/mergeThemes'

export interface IProviderProps {
  theme: IThemeInput
  children: React.ReactNode
}

/**
 * The Provider passes the CSS in JS renderer and theme to your components.
 */
class Provider extends React.Component<IProviderProps, any> {
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
    }),
    children: PropTypes.element.isRequired,
  }

  static Consumer = ProviderConsumer

  renderStaticStyles = () => {
    // RTL WARNING
    // This function sets static styles which are global and renderer agnostic
    // With current implementation, static styles cannot differ between LTR and RTL
    // @see http://fela.js.org/docs/advanced/StaticStyle.html for details

    const { siteVariables, staticStyles } = this.props.theme

    if (!staticStyles) return

    const renderObject = (object: StaticStyleObject) => {
      _.forEach(object, (style, selector) => {
        felaLtrRenderer.renderStatic(style, selector)
      })
    }

    staticStyles.forEach((staticStyle: StaticStyle) => {
      if (typeof staticStyle === 'string') {
        felaLtrRenderer.renderStatic(staticStyle)
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
    // This function sets static styles which are global and renderer agnostic
    // With current implementation, static styles cannot differ between LTR and RTL
    // @see http://fela.js.org/docs/advanced/StaticStyle.html for details

    const { fontFaces } = this.props.theme

    if (!fontFaces) return

    const renderFontObject = (font: IFontFace) => {
      if (!_.isPlainObject(font)) {
        throw new Error(`fontFaces must be objects, got: ${typeof font}`)
      }
      felaLtrRenderer.renderFont(font.name, font.paths, font.style)
    }

    fontFaces.forEach((font: IFontFace) => {
      renderFontObject(font)
    })
  }

  componentDidMount() {
    this.renderStaticStyles()
    this.renderFontFaces()
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
