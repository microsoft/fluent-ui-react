import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import { WithAsProp, ComponentEventHandler, withSafeTypeForAs } from '../../types'
import { accordionContentBehavior } from '../../lib/accessibility'

export interface AccordionContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Whether or not the content is visible. */
  active?: boolean

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<AccordionContentProps>

  /** Id of the title it belongs to. */
  titleId?: string
}

class AccordionContent extends UIComponent<WithAsProp<AccordionContentProps>, any> {
  static displayName = 'AccordionContent'

  static create: Function

  static className = 'ui-accordion__content'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    onClick: PropTypes.func,
    titleId: PropTypes.string,
  }

  static defaultProps = {
    accessibility: accordionContentBehavior,
    as: 'dd',
  }

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    const { children, content } = this.props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
        {...accessibility.attributes.root}
        className={classes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

AccordionContent.create = createShorthandFactory({
  Component: AccordionContent,
  mappedProp: 'content',
})

/**
 * A standard AccordionContent.
 */
export default withSafeTypeForAs<typeof AccordionContent, AccordionContentProps>(AccordionContent)
