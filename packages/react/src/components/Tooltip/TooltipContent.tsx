import { Ref } from '@stardust-ui/react-component-ref'
import * as React from 'react'
import * as PropTypes from 'prop-types'
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
  ShorthandFactory,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'

import { PopperChildrenProps } from '../../lib/positioner'
import { WithAsProp, withSafeTypeForAs } from '../../types'
import Box from '../Box/Box'

export interface TooltipContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** An actual placement value from Popper. */
  placement?: PopperChildrenProps['placement']

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean

  /** A ref to a pointer element. */
  pointerRef?: React.Ref<Element>
}

class TooltipContent extends UIComponent<WithAsProp<TooltipContentProps>> {
  static create: ShorthandFactory<TooltipContentProps>

  static displayName = 'TooltipContent'
  static className = 'ui-tooltip__content'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    placement: PropTypes.string,
    pointing: PropTypes.bool,
    pointerRef: customPropTypes.ref,
  }

  renderComponent({
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
 * A TooltipContent contains the content of a Tooltip component.
 */
export default withSafeTypeForAs<typeof TooltipContent, TooltipContentProps>(TooltipContent)
