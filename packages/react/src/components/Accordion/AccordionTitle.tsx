import { Ref } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { WithAsProp, ComponentEventHandler, ShorthandValue, withSafeTypeForAs } from '../../types'
import Icon from '../Icon/Icon'
import Layout from '../Layout/Layout'
import { accordionTitleBehavior } from '../../lib/accessibility'
import { AccessibilityActionHandlers } from '../../lib/accessibility/types'

export interface AccordionTitleSlotClassNames {
  content: string
}

export interface AccordionTitleProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Id of the content it owns. */
  accordionContentId?: string

  /** Whether or not the title is in the open state. */
  active?: boolean

  /** If at least one panel needs to stay active and this title does not correspond to the last active one. */
  canBeCollapsed?: boolean

  /** AccordionTitle index inside Accordion. */
  index?: number

  /** Ref to the clickable element that contains the title. */
  contentRef?: React.Ref<HTMLElement>

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<AccordionTitleProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<AccordionTitleProps>

  /** Shorthand for the active indicator. */
  indicator?: ShorthandValue
}

class AccordionTitle extends UIComponent<WithAsProp<AccordionTitleProps>, any> {
  static displayName = 'AccordionTitle'

  static create: Function

  static className = 'ui-accordion__title'

  static slotClassNames: AccordionTitleSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon(),
    accordionContentId: PropTypes.string,
    active: PropTypes.bool,
    contentRef: customPropTypes.ref,
    canBeCollapsed: PropTypes.bool,
    index: PropTypes.number,
    onClick: PropTypes.func,
    indicator: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    accessibility: accordionTitleBehavior,
    as: 'dt',
  }

  actionHandlers: AccessibilityActionHandlers = {
    performClick: e => {
      e.preventDefault()
      this.handleClick(e as any)
    },
  }

  private handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  renderComponent({ ElementType, classes, unhandledProps, styles, accessibility }) {
    const { contentRef, children, content, indicator, active } = this.props
    const indicatorWithDefaults = indicator === undefined ? {} : indicator

    const contentElement = (
      <Ref innerRef={contentRef}>
        <Layout
          onFocus={this.handleFocus}
          onClick={this.handleClick}
          className={AccordionTitle.slotClassNames.content}
          {...accessibility.attributes.content}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.content, unhandledProps)}
          start={Icon.create(indicatorWithDefaults, {
            defaultProps: {
              name: active ? 'stardust-arrow-down' : 'stardust-arrow-end',
              styles: styles.indicator,
            },
          })}
          main={rtlTextContainer.createFor({ element: content })}
        />
      </Ref>
    )

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : contentElement}
      </ElementType>
    )
  }
}

AccordionTitle.create = createShorthandFactory({ Component: AccordionTitle, mappedProp: 'content' })

AccordionTitle.slotClassNames = {
  content: `${AccordionTitle.className}__content`,
}

/**
 * A standard AccordionTitle that is used to expand or collapse content.
 */
export default withSafeTypeForAs<typeof AccordionTitle, AccordionTitleProps>(AccordionTitle)
