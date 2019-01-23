import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
  customPropTypes,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import AccordionTitle from './AccordionTitle'
import AccordionContent from './AccordionContent'
import { defaultBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import {
  ComponentEventHandler,
  ReactProps,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'

export interface AccordionProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active panel. */
  activeIndex?: number[] | number

  /** Initial activeIndex value. */
  defaultActiveIndex?: number[] | number

  /** Only allow one panel open at a time. */
  exclusive?: boolean

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick?: ComponentEventHandler<AccordionProps>

  /** Shorthand array of props for Accordion. */
  panels?: {
    content: ShorthandValue
    title: ShorthandValue
  }[]

  /**
   * A custom renderer for each Accordion's panel title.
   *
   * @param {React.ReactType} Component - The panel's component type.
   * @param {object} props - The panel's computed props.
   */
  renderPanelTitle?: ShorthandRenderFunction

  /**
   * A custom renderer for each Accordion's panel content.
   *
   * @param {React.ReactType} Component - The panel's component type.
   * @param {object} props - The panel's computed props.
   */
  renderPanelContent?: ShorthandRenderFunction

  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   * */
  accessibility?: Accessibility
}

/**
 * An accordion allows users to toggle the display of sections of content.
 * @accessibility
 * Implements ARIA Accordion design pattern (keyboard navigation not yet supported).
 * Consider using Tree if you intend to wrap Lists in an Accordion.
 */
class Accordion extends AutoControlledComponent<ReactProps<AccordionProps>, any> {
  static displayName = 'Accordion'

  static className = 'ui-accordion'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    activeIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    defaultActiveIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    exclusive: PropTypes.bool,
    onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
    panels: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.arrayOf(
        PropTypes.shape({
          content: customPropTypes.itemShorthand,
          title: customPropTypes.itemShorthand,
        }),
      ),
    ]),
    accessibility: PropTypes.func,

    renderPanelTitle: PropTypes.func,
    renderPanelContent: PropTypes.func,
  }

  public static defaultProps = {
    accessibility: defaultBehavior as Accessibility,
  }

  static autoControlledProps = ['activeIndex']

  static Title = AccordionTitle
  static Content = AccordionContent

  getInitialAutoControlledState({ exclusive }) {
    return { activeIndex: exclusive ? -1 : [-1] }
  }

  computeNewIndex = index => {
    const { activeIndex } = this.state
    const { exclusive } = this.props

    if (exclusive) return index === activeIndex ? -1 : index
    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndex, index) ? _.without(activeIndex, index) : [...activeIndex, index]
  }

  handleTitleOverrides = predefinedProps => ({
    onClick: (e, titleProps) => {
      const { index } = titleProps
      const activeIndex = this.computeNewIndex(index)

      this.trySetState({ activeIndex }, index)

      _.invoke(predefinedProps, 'onClick', e, titleProps)
      _.invoke(this.props, 'onTitleClick', e, titleProps)
    },
  })

  isIndexActive = (index): boolean => {
    const { exclusive } = this.props
    const { activeIndex } = this.state

    return exclusive ? activeIndex === index : _.includes(activeIndex, index)
  }

  renderPanels = () => {
    const children: any[] = []
    const { panels, renderPanelContent, renderPanelTitle } = this.props

    _.each(panels, (panel, index) => {
      const { content, title } = panel
      const active = this.isIndexActive(index)

      children.push(
        AccordionTitle.create(title, {
          defaultProps: { active, index },
          overrideProps: this.handleTitleOverrides,
          render: renderPanelTitle,
        }),
      )
      children.push(
        AccordionContent.create(content, {
          defaultProps: { active },
          render: renderPanelContent,
        }),
      )
    })

    return children
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderPanels()}
      </ElementType>
    )
  }
}

export default Accordion
