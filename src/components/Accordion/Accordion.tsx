import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import keyboardKey from 'keyboard-key'

import { AutoControlledComponent, customPropTypes, childrenExist } from '../../lib'
import accordionRules from './accordionRules'
import AccordionTitle from './AccordionTitle'
import AccordionContent from './AccordionContent'
import { FocusZone } from '../FocusZone'

/**
 * A standard Accordion.
 * @accessibility
 * Concern: how do we optimally navigate through an Accordion element with nested children?
 */
class Accordion extends AutoControlledComponent<any, any> {
  static displayName = 'Accordion'

  static className = 'ui-accordion'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Index of the currently active panel. */
    activeIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),

    /** Only allow one panel open at a time. */
    exclusive: PropTypes.bool,

    /**
     * Called when a panel title is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All item props.
     */
    onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

    /** Shorthand array of props for Accordion. */
    panels: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.arrayOf(
        PropTypes.shape({
          content: customPropTypes.itemShorthand,
          title: customPropTypes.itemShorthand,
        }),
      ),
    ]),

    grabFocus: PropTypes.bool,
    componentRef: PropTypes.object,
  }

  static rules = accordionRules

  static handledProps = [
    'activeIndex',
    'as',
    'children',
    'className',
    'defaultActiveIndex',
    'exclusive',
    'onTitleClick',
    'panels',
    'grabFocus',
  ]

  static autoControlledProps = ['activeIndex']

  static Title = AccordionTitle
  static Content = AccordionContent

  state: any = { activeIndex: [0] }

  // Need the title elements to focus from content to active title on left key.
  accordionTitles: HTMLElement[] = []
  addAccordionTitle = title => this.accordionTitles.push(title)

  focusZone: FocusZone
  setFocusZone = fz => (this.focusZone = fz)

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

  onTitleKeyDown = (e, titleProps) => {
    const code = keyboardKey.getCode(e)
    if (code === keyboardKey.ArrowRight) {
      this.handleTileRightKey(e, titleProps)
    } else if (code === keyboardKey.ArrowLeft) {
      this.handleTitleLeftKey(e, titleProps)
    }
  }

  onContentKeyDown = (e, titleProps) => {
    const code = keyboardKey.getCode(e)
    if (code === keyboardKey.ArrowRight) {
      this.handleContentRightKey(e, titleProps)
    } else if (code === keyboardKey.ArrowLeft) {
      this.handleContentLeftKey(e, titleProps)
    }
  }

  handleTileRightKey = (e: Event, titleProps) => {
    let { activeIndex } = this.state
    const { index } = titleProps
    const { exclusive } = this.props

    if (exclusive) {
      if (index === activeIndex) {
        return
      }
      activeIndex = index
    } else {
      if (_.includes(activeIndex, index)) {
        return
      }
      activeIndex = [...activeIndex, index]
    }

    e.preventDefault()
    this.trySetState({ activeIndex }, index)
  }

  handleTitleLeftKey = (e: Event, titleProps) => {
    let { activeIndex } = this.state
    const { index } = titleProps
    const { exclusive } = this.props

    e.preventDefault()
    if (exclusive) {
      if (index !== activeIndex) {
        return
      }
      activeIndex = -1
    } else {
      if (!_.includes(activeIndex, index)) {
        return
      }
      activeIndex = _.without(activeIndex, index)
    }

    this.trySetState({ activeIndex }, index)
  }

  handleContentLeftKey = (e, contentProps) => {
    const { activeIndex } = this.state

    e.preventDefault()
    this.focusZone.focusElement(this.accordionTitles[activeIndex])
  }

  handleContentRightKey = (e, contentProps) => e.preventDefault()

  isIndexActive = (index): boolean => {
    const { exclusive } = this.props
    const { activeIndex } = this.state

    return exclusive ? activeIndex === index : _.includes(activeIndex, index)
  }

  renderPanels = () => {
    const children = []
    const { panels } = this.props

    _.each(panels, (panel, index) => {
      const { content, title } = panel
      const active = this.isIndexActive(index)

      children.push(
        AccordionTitle.create(title, {
          generateKey: true,
          defaultProps: {
            active,
            index,
            onKeyDown: this.onTitleKeyDown,
            addAccordionTitle: this.addAccordionTitle,
          },
          overrideProps: this.handleTitleOverrides,
        }),
      )
      children.push(
        AccordionContent.create(
          { content },
          {
            generateKey: true,
            defaultProps: { active, onKeyDown: this.onContentKeyDown },
          },
        ),
      )
    })

    return children
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children } = this.props

    return (
      <FocusZone
        elementType={ElementType}
        preventDefaultWhenHandled={true}
        {...rest}
        className={classes.root}
        ref={this.setFocusZone}
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
      >
        {childrenExist(children) ? children : this.renderPanels()}
      </FocusZone>
    )
  }
}

export default Accordion
