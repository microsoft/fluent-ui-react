import { Ref } from '@stardust-ui/react-component-ref'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { PopperChildrenProps } from '../../lib/positioner'
import { WithAsProp, ComponentEventHandler, withSafeTypeForAs } from '../../types'
import Box from '../Box/Box'

export interface TooltipContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /**
   * Called after user's mouse enter.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter?: ComponentEventHandler<TooltipContentProps>

  /**
   * Called after user's mouse leave.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseLeave?: ComponentEventHandler<TooltipContentProps>

  /** An actual placement value from Popper. */
  placement?: PopperChildrenProps['placement']

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean

  /** A ref to a pointer element. */
  pointerRef?: React.Ref<Element>
}

class TooltipContent extends UIComponent<WithAsProp<TooltipContentProps>> {
  public static create: Function

  public static displayName = 'TooltipContent'
  public static className = 'ui-tooltip__content'

  public static propTypes = {
    ...commonPropTypes.createCommon(),
    placement: PropTypes.string,
    pointing: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    pointerRef: customPropTypes.ref,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  private handleMouseEnter = e => {
    _.invoke(this.props, 'onMouseEnter', e, this.props)
  }

  private handleMouseLeave = e => {
    _.invoke(this.props, 'onMouseLeave', e, this.props)
  }

  public renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
    styles,
  }: RenderResultConfig<TooltipContentProps>): React.ReactNode {
    const { children, content, pointing, pointerRef } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {pointing && (
          <Ref innerRef={pointerRef}>
            {Box.create({}, { defaultProps: { styles: styles.pointer } })}
          </Ref>
        )}

        {Box.create(
          {},
          {
            defaultProps: {
              children: childrenExist(children) ? children : content,
              styles: styles.content,
            },
          },
        )}
      </ElementType>
    )
  }
}

TooltipContent.create = createShorthandFactory({ Component: TooltipContent, mappedProp: 'content' })

/**
 * A TooltipContent displays the content of a Tooltip component
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default withSafeTypeForAs<typeof TooltipContent, TooltipContentProps>(TooltipContent)
