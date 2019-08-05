import { IStyle } from '@stardust-ui/fela'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { RendererProvider, ThemeProvider, ThemeContext } from '@stardust-ui/react-fela'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import { felaRenderer, ChildrenComponentProps } from '../../lib'

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
  target?: Document
  theme?: ThemeInput
  variables?: ComponentVariablesInput
}

/**
 * The Provider passes the CSS-in-JS renderer, theme styles and other settings to Stardust components.
 */
const Provider: React.FunctionComponent<WithAsProp<ProviderProps>> & {
  Consumer: typeof ProviderConsumer
  Box: typeof ProviderBox
} = props => {
  const incomingContext: ProviderContextInput = React.useContext(ThemeContext)
  const staticStylesRendered = React.useRef(false)

  const {
    as,
    theme,
    rtl,
    disableAnimations,
    renderer,
    variables,
    children,
    target,
    ...unhandledProps
  } = props

  const renderStaticStyles = (mergedTheme: ThemePrepared) => {
    const { siteVariables } = mergedTheme
    const { staticStyles } = theme

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

  const renderStaticStylesOnce = (mergedTheme: ThemePrepared) => {
    if (!staticStylesRendered.current && theme.staticStyles) {
      renderStaticStyles(mergedTheme)
      staticStylesRendered.current = true
    }
  }

  const renderFontFaces = () => {
    const { fontFaces } = theme

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

  React.useLayoutEffect(() => {
    renderFontFaces()
  })

  const outgoingContext: ProviderContextPrepared = React.useMemo(() => {
    const inputContext: ProviderContextInput = {
      theme,
      rtl,
      disableAnimations,
      renderer,
    }

    return mergeContexts(incomingContext, inputContext)
  }, [incomingContext, theme, rtl, disableAnimations, renderer])

  renderStaticStylesOnce(outgoingContext.theme)

  const rtlProps: { dir?: 'rtl' | 'ltr' } = {}
  // only add dir attribute for top level provider or when direction changes from parent to child
  if (
    !incomingContext ||
    (incomingContext.rtl !== outgoingContext.rtl && _.isBoolean(outgoingContext.rtl))
  ) {
    rtlProps.dir = outgoingContext.rtl ? 'rtl' : 'ltr'
  }

  return (
    <RendererProvider renderer={outgoingContext.renderer} target={target} {...{ rehydrate: false }}>
      <ThemeProvider theme={outgoingContext}>
        <ProviderBox as={as} variables={variables} {...unhandledProps} {...rtlProps}>
          {children}
        </ProviderBox>
      </ThemeProvider>
    </RendererProvider>
  )
}

Provider.displayName = 'Provider'
Provider.propTypes = {
  as: customPropTypes.as,
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
  renderer: PropTypes.object as PropTypes.Validator<Renderer>,
  rtl: PropTypes.bool,
  disableAnimations: PropTypes.bool,
  children: PropTypes.node.isRequired,
  target: PropTypes.object as PropTypes.Validator<Document>,
}

Provider.defaultProps = {
  theme: {},
}

Provider.Consumer = ProviderConsumer
Provider.Box = ProviderBox

export default withSafeTypeForAs<typeof Provider, ProviderProps & ProviderBoxProps>(Provider)
