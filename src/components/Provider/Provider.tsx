import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Provider as RendererProvider, ThemeProvider } from 'react-fela'

import {
  callable,
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
  ComponentVariablesInput,
  IThemeComponentStylesInput,
  IComponentPartStylesInput,
  IThemeComponentVariablesInput,
  ComponentStyleFunctionParam,
  ComponentPartStyleFunction,
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
class Provider extends Component<IProviderProps, any> {
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
      siteVariables: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
      componentVariables: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
      ]),
      componentStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
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

  renderStaticStyles = () => {
    // RTL WARNING
    // This function sets static styles which are global and renderer agnostic
    // With current implementation, static styles cannot differ between LTR and RTL
    // @see http://fela.js.org/docs/advanced/StaticStyle.html for details

    const { theme, staticStyles } = this.props

    if (!staticStyles) return

    const renderObject = object => {
      _.forEach(object, (style, selector) => {
        felaLtrRenderer.renderStatic(style, selector)
      })
    }

    const staticStylesArr = [].concat(staticStyles).filter(Boolean)

    staticStylesArr.forEach(staticStyle => {
      if (typeof staticStyle === 'string') {
        felaLtrRenderer.renderStatic(staticStyle)
      } else if (_.isPlainObject(staticStyle)) {
        renderObject(staticStyle)
      } else if (_.isFunction(staticStyle)) {
        renderObject(staticStyle(theme.siteVariables))
      } else {
        throw new Error(
          `staticStyles array must contain CSS strings, style objects, or rule functions, got: ${typeof staticStyle}`,
        )
      }
    })
  }

  renderFontFaces = () => {
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
      felaLtrRenderer.renderFont(font.name, font.path, font.style)
    }

    fontFaces.forEach(fontObject => {
      renderFontObject(fontObject)
    })
  }

  componentDidMount() {
    this.renderStaticStyles()
    this.renderFontFaces()
  }

  render() {
    const { theme, children } = this.props

    console.log('Provider props.theme', theme)

    return (
      <ProviderConsumer
        render={(incomingTheme: IThemePrepared) => {
          // The provider must:
          //   1. Normalize it's theme props, reducing and merging where possible.
          //   2. Merge prop values onto any incoming context values.
          //   3. Provide the result down stream.
          const outgoingTheme: IThemePrepared = mergeThemes(incomingTheme, theme)

          return (
            <RendererProvider renderer={outgoingTheme.renderer}>
              <ThemeProvider theme={outgoingTheme}>{children}</ThemeProvider>
            </RendererProvider>
          )
        }}
      />
    )
  }
}

export default Provider
