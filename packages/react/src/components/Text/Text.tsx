import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  SizeValue,
  AlignValue,
} from '../../utils'
import { Accessibility } from '@fluentui/accessibility'

import {
  FluentComponentStaticProps,
  ProviderContextPrepared,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings'
// @ts-ignore
import { ThemeContext } from 'react-fela'

export interface TextProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>

  /** At mentions can be formatted to draw users' attention. Mentions for "me" can be formatted to appear differently. */
  atMention?: boolean | 'me'

  /** Set as disabled Text component */
  disabled?: boolean

  /** Set as error Text component */
  error?: boolean

  /** The text can appear more important and draw user's attention */
  important?: boolean

  /** The size for the Text component */
  size?: SizeValue

  /** The weight for the Text component */
  weight?: 'light' | 'semilight' | 'regular' | 'semibold' | 'bold'

  /** Set as success Text component */
  success?: boolean

  /** The text can signify a temporary state */
  temporary?: boolean

  /** Align text content. */
  align?: AlignValue

  /** Set as timestamp Text component */
  timestamp?: boolean

  /** Truncates text as needed */
  truncated?: boolean
}

const Text: React.FC<WithAsProp<TextProps>> & FluentComponentStaticProps<TextProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { setStart, setEnd } = useTelemetry(Text.displayName, context.telemetry)
  setStart()

  const {
    accessibility,
    align,
    atMention,
    children,
    className,
    color,
    content,
    design,
    disabled,
    error,
    important,
    size,
    styles,
    success,
    timestamp,
    truncated,
    temporary,
    variables,
    weight,
  } = props

  const getA11Props = useAccessibility(accessibility, {
    debugName: Text.displayName,
    rtl: context.rtl,
  })
  const { classes } = useStyles(Text.displayName, {
    className: Text.className,
    mapPropsToStyles: () => ({
      atMention,
      color,
      important,
      timestamp,
      truncated,
      disabled,
      error,
      success,
      temporary,
      align,
      weight,
      size,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  })

  const unhandledProps = getUnhandledProps(Text.handledProps, props)
  const ElementType = getElementType(props)

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  )

  setEnd()

  return element
}

Text.className = 'ui-text'
Text.displayName = 'Text'

Text.defaultProps = {
  as: 'span',
}
Text.propTypes = {
  ...commonPropTypes.createCommon({ color: true }),
  atMention: PropTypes.oneOfType<any>([PropTypes.bool, PropTypes.oneOf(['me'])]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  important: PropTypes.bool,
  size: customPropTypes.size,
  weight: PropTypes.oneOf(['light', 'semilight', 'regular', 'semibold', 'bold']),
  success: PropTypes.bool,
  temporary: PropTypes.bool,
  align: customPropTypes.align,
  timestamp: PropTypes.bool,
  truncated: PropTypes.bool,
}
Text.handledProps = Object.keys(Text.propTypes) as any

Text.create = createShorthandFactory({ Component: Text, mappedProp: 'content' })

/**
 * A Text consistently styles and formats occurrences of text.
 */
export default withSafeTypeForAs<typeof Text, TextProps, 'span'>(Text)
