import { Accessibility } from '@fluentui/accessibility'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import Popper from 'popper.js'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils'

import { PopperChildrenProps } from '../../utils/positioner'
import {
  FluentComponentStaticProps,
  ProviderContextPrepared,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types'

export interface TooltipContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>

  /** An actual placement value from Popper. */
  placement?: PopperChildrenProps['placement']

  /** Defines whether tooltip is displayed. */
  open?: boolean

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean

  /** A ref to a pointer element. */
  pointerRef?: React.Ref<HTMLDivElement>
}

const TooltipContent: React.FC<WithAsProp<TooltipContentProps>> &
  FluentComponentStaticProps<TooltipContentProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { setStart, setEnd } = useTelemetry(TooltipContent.displayName, context.telemetry)
  setStart()

  const {
    accessibility,
    children,
    className,
    content,
    design,
    open,
    placement,
    pointing,
    pointerRef,
    styles,
    variables,
  } = props

  const getA11Props = useAccessibility(accessibility, {
    debugName: TooltipContent.displayName,
    rtl: context.rtl,
  })
  const { classes } = useStyles(TooltipContent.displayName, {
    className: TooltipContent.className,
    mapPropsToStyles: () => ({
      open,
      placement,
      pointing,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  })

  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(TooltipContent.handledProps, props)

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps,
      })}
    >
      {open && pointing && <div className={classes.pointer} ref={pointerRef} />}

      <div {...getA11Props('content', { className: classes.content })}>
        {childrenExist(children) ? children : content}
      </div>
    </ElementType>
  )
  setEnd()

  return element
}

TooltipContent.displayName = 'TooltipContent'
TooltipContent.className = 'ui-tooltip__content'

TooltipContent.propTypes = {
  ...commonPropTypes.createCommon(),
  placement: PropTypes.oneOf<Popper.Placement>([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  pointing: PropTypes.bool,
  pointerRef: customPropTypes.ref,
}
TooltipContent.handledProps = Object.keys(TooltipContent.propTypes) as any

TooltipContent.create = createShorthandFactory({ Component: TooltipContent, mappedProp: 'content' })

/**
 * A TooltipContent contains the content of a Tooltip component.
 */
export default withSafeTypeForAs<typeof TooltipContent, TooltipContentProps>(TooltipContent)
