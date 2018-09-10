import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import {
  ComponentEventHandler,
  Extendable,
  ItemShorthand,
  ReactChildren,
} from '../../../types/utils'
import Radio from './Radio'

export interface IRadioGroupProps {
  as?: any
  children?: ReactChildren
  className?: string
  content?: React.ReactNode
  onChange?: ComponentEventHandler<IRadioGroupProps>
  radios?: ItemShorthand[]
  defaultSelectedValue?: string | number
  selectedValue?: string | number
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A radio group.
 */
class RadioGroup extends AutoControlledComponent<Extendable<IRadioGroupProps>, any> {
  public static displayName = 'RadioGroup'

  public static className = 'ui-radios'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** The initial selectedValue. */
    defaultSelectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Called after any radio in the group is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onChange: PropTypes.func,

    /** The radios contained inside the RadioGroup. */
    radios: customPropTypes.collectionShorthand,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The selected value in the radio group. */
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'children',
    'className',
    'content',
    'defaultSelectedValue',
    'radios',
    'styles',
    'selectedValue',
    'variables',
  ]

  public static defaultProps = {
    as: 'div',
  }

  private componentDidMountFlag = false

  static autoControlledProps = ['selectedValue']

  private handleRadioChange = (e: React.SyntheticEvent, { value }) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(e, { ...this.props, selectedValue: value })
    }

    this.trySetState({ selectedValue: value })
  }

  componentDidMount() {
    this.componentDidMountFlag = true
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const { children, content, radios, defaultSelectedValue } = this.props

    if (_.isNil(radios)) {
      return (
        <ElementType {...rest} className={classes.root}>
          {childrenExist(children) ? children : content}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root} role="radiogroup">
        {_.map(radios, radio =>
          Radio.create(radio, {
            defaultProps: {
              ...(!this.componentDidMountFlag &&
                radio.value &&
                defaultSelectedValue &&
                radio.value === defaultSelectedValue && {
                  checked: true,
                }),
            },
            overrideProps: {
              onChange: this.handleRadioChange,
            },
          }),
        )}
      </ElementType>
    )
  }
}

export default RadioGroup
