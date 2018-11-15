import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { UIComponent, childrenExist, customPropTypes } from '../../lib'
import { Extendable } from '../../../types/utils'
import Button from './Button'
import { buttonGroupBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentComponentPropsTypes,
} from '../../lib/commonPropTypes'

import { ButtonGroupProps } from './ButtonGroup.types'

/**
 * A button group presents multiple related actions.
 */
class ButtonGroup extends UIComponent<Extendable<ButtonGroupProps>, any> {
  public static displayName = 'ButtonGroup'

  public static className = 'ui-buttons'

  public static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentComponentPropsTypes,
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    buttons: customPropTypes.collectionShorthand,
    circular: PropTypes.bool,
    renderButton: PropTypes.func,
  }

  public static defaultProps = {
    as: 'div',
    accessibility: buttonGroupBehavior as Accessibility,
  }

  public renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    rest,
  }): React.ReactNode {
    const { children, content, buttons, circular, renderButton } = this.props
    if (_.isNil(buttons)) {
      return (
        <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
          {childrenExist(children) ? children : content}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {_.map(buttons, (button, idx) =>
          Button.create(button, {
            defaultProps: {
              circular,
              styles: this.getStyleForButtonIndex(styles, idx === 0, idx === buttons.length - 1),
            },
            render: renderButton,
          }),
        )}
      </ElementType>
    )
  }

  getStyleForButtonIndex = (styles, isFirst, isLast) => {
    let resultStyles = {}
    if (isFirst) {
      resultStyles = styles.firstButton
    }
    if (isLast) {
      resultStyles = { ...resultStyles, ...styles.lastButton }
    }
    if (!isFirst && !isLast) {
      resultStyles = styles.middleButton
    }
    return resultStyles
  }
}

export default ButtonGroup
