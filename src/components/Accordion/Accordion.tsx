import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { AutoControlledComponent, customPropTypes, childrenExist, Extendable } from '../../lib'
import AccordionTitle from './AccordionTitle'
import AccordionContent from './AccordionContent'
import { DefaultBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'

export interface IAccordionProps {
  as?: any
  activeIndex?: number[] | number
  className?: string
  defaultActiveIndex?: number[] | number
  exclusive?: boolean
  onTitleClick?: (event: React.SyntheticEvent, data: IAccordionProps) => void
  panels?: {
    content: React.ReactNode | object
    title: React.ReactNode | object
  }[]
  accessibility?: object | Function
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A standard Accordion.
 * @accessibility
 * Concern: how do we optimally navigate through an Accordion element with nested children?
 */
class Accordion extends AutoControlledComponent<Extendable<IAccordionProps>, any> {
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

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'activeIndex',
    'as',
    'children',
    'className',
    'defaultActiveIndex',
    'exclusive',
    'onTitleClick',
    'panels',
    'styles',
    'variables',
  ]

  public static defaultProps = {
    accessibility: DefaultBehavior as Accessibility,
  }

  static autoControlledProps = ['activeIndex']

  static Title = AccordionTitle
  static Content = AccordionContent

  state: any = { activeIndex: [0] }

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
    const children: UIComponent<any, any>[] = []
    const { panels } = this.props

    _.each(panels, (panel, index) => {
      const { content, title } = panel
      const active = this.isIndexActive(index)

      children.push(
        AccordionTitle.create(title, {
          generateKey: true,
          defaultProps: { active, index },
          overrideProps: this.handleTitleOverrides,
        }),
      )
      children.push(
        AccordionContent.create(
          { content },
          {
            generateKey: true,
            defaultProps: { active },
          },
        ),
      )
    })

    return children
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children } = this.props

    return (
      <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderPanels()}
      </ElementType>
    )
  }
}

export default Accordion
