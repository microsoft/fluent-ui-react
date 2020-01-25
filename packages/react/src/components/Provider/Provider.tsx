import { IStyle } from 'fela'
import * as _ from 'lodash'
import { Renderer, Telemetry } from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import {
  mergeSiteVariables,
  ThemePrepared,
  StaticStyleObject,
  StaticStyle,
  StaticStyleFunction,
  FontFace,
  ComponentVariablesInput,
  ThemeInput,
} from '@fluentui/styles'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { RendererProvider, ThemeProvider, ThemeContext } from 'react-fela'

import { ChildrenComponentProps, setUpWhatInput, tryCleanupWhatInput } from '../../utils'

import ProviderConsumer from './ProviderConsumer'
import ProviderBox, { ProviderBoxProps } from './ProviderBox'
import {
  WithAsProp,
  ProviderContextInput,
  ProviderContextPrepared,
  withSafeTypeForAs,
} from '../../types'
import mergeContexts from '../../utils/mergeProviderContexts'

export interface ProviderProps extends ChildrenComponentProps {
  renderer?: Renderer
  rtl?: boolean
  disableAnimations?: boolean
  overwrite?: boolean
  target?: Document
  theme?: ThemeInput
  variables?: ComponentVariablesInput
  telemetryRef?: React.Ref<Telemetry>
}

/**
 * The Provider passes the CSS-in-JS renderer, theme styles and other settings to Fluent UI components.
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
    telemetryRef: customPropTypes.ref,
  }

  static defaultProps = {
    theme: {},
  }

  static Consumer = ProviderConsumer
  static Box = ProviderBox
  static contextType = ThemeContext

  outgoingContext: ProviderContextPrepared
  staticStylesRendered: boolean = false

  telemetry: Telemetry

  renderStaticStyles = (renderer: Renderer, mergedTheme: ThemePrepared) => {
    const { siteVariables } = mergedTheme
    const { staticStyles } = this.props.theme

    if (!staticStyles) return

    const renderObject = (object: StaticStyleObject) => {
      _.forEach(object, (style, selector) => {
        renderer.renderStatic(style as IStyle, selector)
      })
    }

    staticStyles.forEach((staticStyle: StaticStyle) => {
      if (typeof staticStyle === 'string') {
        renderer.renderStatic(staticStyle)
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

  renderFontFaces = (renderer: Renderer) => {
    const { fontFaces } = this.props.theme

    if (!fontFaces) return

    const renderFontObject = (font: FontFace) => {
      if (!_.isPlainObject(font)) {
        throw new Error(`fontFaces must be objects, got: ${typeof font}`)
      }

      renderer.renderFont(font.name, font.paths, font.props)
    }

    fontFaces.forEach((font: FontFace) => {
      renderFontObject(font)
    })
  }

  componentDidMount() {
    this.renderFontFaces(this.outgoingContext.renderer)
    if (this.props.target) {
      setUpWhatInput(this.props.target)
    }
  }

  componentWillUnmount() {
    if (this.props.target) {
      tryCleanupWhatInput(this.props.target)
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
      telemetryRef,
      ...unhandledProps
    } = this.props

    if (telemetryRef) {
      if (!this.telemetry) {
        this.telemetry = new Telemetry()
      }

      telemetryRef['current'] = this.telemetry
    } else if (this.telemetry) {
      delete this.telemetry
    }

    const inputContext: ProviderContextInput = {
      theme,
      rtl,
      disableAnimations,
      renderer,
      target,
      telemetry: this.telemetry,
    }

    const incomingContext: ProviderContextPrepared = overwrite ? {} : this.context
    // rehydration disabled to avoid leaking styles between renderers
    // https://github.com/rofrischmann/fela/blob/master/docs/api/fela-dom/rehydrate.md
    this.outgoingContext = mergeContexts(incomingContext, inputContext)

    this.renderStaticStylesOnce(this.outgoingContext.theme)

    const rtlProps: { dir?: 'rtl' | 'ltr' } = {}
    // only add dir attribute for top level provider or when direction changes from parent to child
    if (
      !this.context ||
      (this.context.rtl !== this.outgoingContext.rtl && _.isBoolean(this.outgoingContext.rtl))
    ) {
      rtlProps.dir = this.outgoingContext.rtl ? 'rtl' : 'ltr'
    }

    return (
      <RendererProvider
        renderer={this.outgoingContext.renderer}
        {...{ rehydrate: false, targetDocument: this.outgoingContext.target }}
      >
        <ThemeProvider theme={this.outgoingContext} overwrite>
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
      this.renderStaticStyles(this.outgoingContext.renderer, mergedTheme)
      this.staticStylesRendered = true
    }
  }
}

export default withSafeTypeForAs<typeof Provider, ProviderProps & ProviderBoxProps>(Provider)
