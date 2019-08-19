import { IStyle } from '@stardust-ui/fela'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { RendererProvider, ThemeProvider, ThemeContext } from '@stardust-ui/react-fela'

import { felaRenderer, ChildrenComponentProps, setUpWhatInput } from '../../lib'

import {
  ThemePrepared,
  StaticStyleObject,
  StaticStyle,
  StaticStyleFunction,
  FontFace,
  ComponentVariablesInput,
  Renderer,
  ThemeInput,
} from '../../themes/types'

import ProviderConsumer from './ProviderConsumer'
import { mergeSiteVariables } from '../../lib/mergeThemes'
import ProviderBox, { ProviderBoxProps } from './ProviderBox'
import {
  WithAsProp,
  ProviderContextInput,
  ProviderContextPrepared,
  withSafeTypeForAs,
} from '../../types'
import mergeContexts from '../../lib/mergeProviderContexts'

export interface ProviderProps extends ChildrenComponentProps {
  renderer?: Renderer
  rtl?: boolean
  disableAnimations?: boolean
  overwrite?: boolean
  target?: Document
  theme?: ThemeInput
  variables?: ComponentVariablesInput
}

/**
 * The Provider passes the CSS-in-JS renderer, theme styles and other settings to Stardust components.
 */
class Provider extends React.Component<WithAsProp<ProviderProps>> {
  static displayName = 'Provider'

  static propTypes = {
    as: PropTypes.elementType,
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    theme: PropTypes.shape({
      siteVariables: PropTypes.object,
      componentVariables: PropTypes.object,
      componentStyles: PropTypes.object,
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
    renderer: PropTypes.object,
    rtl: PropTypes.bool,
    disableAnimations: PropTypes.bool,
    children: PropTypes.node.isRequired,
    target: PropTypes.object,
  }

  static defaultProps = {
    theme: {},
  }

  static Consumer = ProviderConsumer
  static Box = ProviderBox
  static contextType = ThemeContext

  staticStylesRendered: boolean = false

  renderStaticStyles = (mergedTheme: ThemePrepared) => {
    const { siteVariables } = mergedTheme
    const { staticStyles } = this.props.theme

    if (!staticStyles) return

    const renderObject = (object: StaticStyleObject) => {
      _.forEach(object, (style, selector) => {
        felaRenderer.renderStatic(style as IStyle, selector)
      })
    }

    staticStyles.forEach((staticStyle: StaticStyle) => {
      if (typeof staticStyle === 'string') {
        felaRenderer.renderStatic(staticStyle)
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
    const { fontFaces } = this.props.theme

    if (!fontFaces) return

    const renderFontObject = (font: FontFace) => {
      if (!_.isPlainObject(font)) {
        throw new Error(`fontFaces must be objects, got: ${typeof font}`)
      }

      felaRenderer.renderFont(font.name, font.paths, font.props)
    }

    fontFaces.forEach((font: FontFace) => {
      renderFontObject(font)
    })
  }

  componentDidMount() {
    this.renderFontFaces()
    if (this.props.target) {
      setUpWhatInput(this.props.target)
    }
  }

  render() {
    const {
      as,
      children,
      disableAnimations,
      overwrite,
      renderer,
      rtl,
      target,
      theme,
      variables,
      ...unhandledProps
    } = this.props
    const inputContext: ProviderContextInput = {
      theme,
      rtl,
      disableAnimations,
      renderer,
    }

    const incomingContext: ProviderContextPrepared = overwrite ? {} : this.context
    // rehydration disabled to avoid leaking styles between renderers
    // https://github.com/rofrischmann/fela/blob/master/docs/api/fela-dom/rehydrate.md
    const outgoingContext: ProviderContextPrepared = mergeContexts(incomingContext, inputContext)

    this.renderStaticStylesOnce(outgoingContext.theme)

    const rtlProps: { dir?: 'rtl' | 'ltr' } = {}
    // only add dir attribute for top level provider or when direction changes from parent to child
    if (
      !this.context ||
      (this.context.rtl !== outgoingContext.rtl && _.isBoolean(outgoingContext.rtl))
    ) {
      rtlProps.dir = outgoingContext.rtl ? 'rtl' : 'ltr'
    }

    return (
      <RendererProvider
        renderer={outgoingContext.renderer}
        target={target}
        {...{ rehydrate: false }}
      >
        <ThemeProvider theme={outgoingContext} overwrite>
          <ProviderBox as={as} variables={variables} {...unhandledProps} {...rtlProps}>
            {children}
          </ProviderBox>
        </ThemeProvider>
      </RendererProvider>
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

export default withSafeTypeForAs<typeof Provider, ProviderProps & ProviderBoxProps>(Provider)
