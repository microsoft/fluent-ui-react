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
import Box from '../Box/Box'
import { accordionTitleBehavior } from '../../lib/accessibility'
import { AccessibilityActionHandlers } from 'src/lib/accessibility/types'

export interface AccordionTitleSlotClassNames {
  button: string
}

export interface AccordionTitleProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Whether or not the title is in the open state. */
  active?: boolean

  /** If at least one panel needs to stay active and this title does not correspond to the last active one. */
  canBeCollapsed?: boolean

  /** Id of the content it owns. */
  contentId?: string

  /** AccordionTitle index inside Accordion. */
  index?: number

  /** Ref to the button. */
  buttonRef: React.Ref<HTMLElement>

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
    active: PropTypes.bool,
    buttonRef: customPropTypes.ref,
    canBeCollapsed: PropTypes.bool,
    contentId: PropTypes.string,
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
    const { buttonRef, children, content, indicator, active } = this.props
    const indicatorWithDefaults = indicator === undefined ? {} : indicator

    const contentElement = (
      <Ref innerRef={buttonRef}>
        <Box
          onFocus={this.handleFocus}
          onClick={this.handleClick}
          className={AccordionTitle.slotClassNames.button}
          {...accessibility.attributes.button}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.button, unhandledProps)}
        >
          <Layout
            start={Icon.create(indicatorWithDefaults, {
              defaultProps: {
                name: active ? 'stardust-arrow-down' : 'stardust-arrow-end',
                styles: styles.indicator,
              },
            })}
            main={rtlTextContainer.createFor({ element: content })}
          />
        </Box>
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
  button: `${AccordionTitle.className}__button`,
}

/**
 * A standard AccordionTitle that is used to expand or collapse content.
 */
export default withSafeTypeForAs<typeof AccordionTitle, AccordionTitleProps>(AccordionTitle)
