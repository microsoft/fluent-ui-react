import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {
  AutoControlledComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { accordionBehavior } from '../../lib/accessibility'
import AccordionTitle, { AccordionTitleProps } from './AccordionTitle'
import AccordionContent from './AccordionContent'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'

import {
  ComponentEventHandler,
  ReactProps,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../types'
import { ContainerFocusHandler } from 'src/lib/accessibility/FocusHandling/FocusContainer'

export interface AccordionSlotClassNames {
  content: string
  title: string
}

export interface AccordionProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active panel. */
  activeIndex?: number[] | number

  /** At least one panel should be active at any time. */
  alwaysActive?: boolean

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

  static slotClassNames: AccordionSlotClassNames = {
    content: `${Accordion.className}__content`,
    title: `${Accordion.className}__title`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    activeIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    alwaysActive: PropTypes.bool,
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

    renderPanelTitle: PropTypes.func,
    renderPanelContent: PropTypes.func,
  }

  public static defaultProps = {
    accessibility: accordionBehavior,
    as: 'dl',
  }

  static autoControlledProps = ['activeIndex']

  static Title = AccordionTitle
  static Content = AccordionContent

  private focusHandler: ContainerFocusHandler = null
  private itemRefs = []

  actionHandlers: AccessibilityActionHandlers = {
    moveNext: e => {
      e.preventDefault()
      this.focusHandler.moveNext()
    },
    movePrevious: e => {
      e.preventDefault()
      this.focusHandler.movePrevious()
    },
    moveFirst: e => {
      e.preventDefault()
      this.focusHandler.moveFirst()
    },
    moveLast: e => {
      e.preventDefault()
      this.focusHandler.moveLast()
    },
  }

  constructor(props, context) {
    super(props, context)

    this.focusHandler = new ContainerFocusHandler(
      () => this.props.panels.length,
      index => {
        this.setState({ focusedIndex: index }, () => {
          const targetComponent = this.itemRefs[index] && this.itemRefs[index].current
          const targetDomNode = ReactDOM.findDOMNode(targetComponent) as any

          targetDomNode && targetDomNode.focus()
        })
      },
      true,
    )
  }

  getInitialAutoControlledState({ alwaysActive, exclusive }: AccordionProps) {
    return { activeIndex: exclusive ? (alwaysActive ? 0 : -1) : alwaysActive ? [0] : [-1] }
  }

  computeNewIndex = index => {
    const { activeIndex } = this.state
    const { exclusive } = this.props

    if (this.isIndexClosingPrevented(index)) {
      return activeIndex
    }

    if (exclusive) return index === activeIndex ? -1 : index
    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndex, index) ? _.without(activeIndex, index) : [...activeIndex, index]
  }

  handleTitleOverrides = predefinedProps => ({
    onClick: (e, titleProps) => {
      const { index } = titleProps
      const activeIndex = this.computeNewIndex(index)

      this.trySetState({ activeIndex })

      _.invoke(predefinedProps, 'onClick', e, titleProps)
      _.invoke(this.props, 'onTitleClick', e, titleProps)
    },
    onFocus: (e: React.SyntheticEvent, titleProps: AccordionTitleProps) => {
      _.invoke(predefinedProps, 'onFocus', e, titleProps)
      this.setState({ focusedIndex: titleProps.index })
    },
  })

  private isIndexActive = (index: number): boolean => {
    const { exclusive } = this.props
    const { activeIndex } = this.state

    return exclusive ? activeIndex === index : _.includes(activeIndex, index)
  }

  private isIndexClosingPrevented = (index: number): boolean => {
    const { activeIndex } = this.state
    const { alwaysActive, exclusive } = this.props

    if (alwaysActive) {
      if (exclusive) {
        return activeIndex === index
      }
      return activeIndex.length === 1 && activeIndex[0] === index
    }

    return false
  }

  renderPanels = () => {
    const children: any[] = []
    const { panels, renderPanelContent, renderPanelTitle } = this.props
    const { focusedIndex } = this.state

    this.itemRefs = []
    this.focusHandler.syncFocusedIndex(focusedIndex)

    _.each(panels, (panel, index) => {
      const { content, title } = panel
      const active = this.isIndexActive(index)
      const cannotBeClosed = this.isIndexClosingPrevented(index)
      const buttonRef = React.createRef<HTMLElement>()
      const titleId = title['id'] || _.uniqueId('accordion-title-')
      const contentId = content['id'] || _.uniqueId('accordion-content-')
      this.itemRefs[index] = buttonRef

      children.push(
        AccordionTitle.create(title, {
          defaultProps: {
            className: Accordion.slotClassNames.title,
            active,
            index,
            buttonRef,
            cannotBeClosed,
            id: titleId,
            contentId,
          },
          overrideProps: this.handleTitleOverrides,
          render: renderPanelTitle,
        }),
      )
      children.push(
        AccordionContent.create(content, {
          defaultProps: {
            className: Accordion.slotClassNames.content,
            active,
            id: contentId,
            titleId,
          },
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
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderPanels()}
      </ElementType>
    )
  }
}

export default Accordion
