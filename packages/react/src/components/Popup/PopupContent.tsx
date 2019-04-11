import * as React from 'react'
import { PopperChildrenProps } from 'react-popper'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

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
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ComponentEventHandler } from '../../types'
import Box from '../Box/Box'
import Ref from '../Ref/Ref'

export interface PopupContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /**
   * Called after user's mouse enter.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter?: ComponentEventHandler<PopupContentProps>

  /**
   * Called after user's mouse leave.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseLeave?: ComponentEventHandler<PopupContentProps>

  /** An actual placement value from Popper. */
  placement?: PopperChildrenProps['placement']

  /** A popup can show a pointer to trigger. */
  pointing?: boolean

  /** A ref to a pointer element. */
  pointerRef?: PopperChildrenProps['arrowProps']['ref']

  /** An object with positioning styles fof a pointer. */
  pointerStyle?: PopperChildrenProps['arrowProps']['style']
}

/**
 * A PopupContent displays the content of a Popup component
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class PopupContent extends UIComponent<ReactProps<PopupContentProps>, any> {
  public static create: Function

  public static displayName = 'PopupContent'
  public static className = 'ui-popup__content'

  public static propTypes = {
    ...commonPropTypes.createCommon(),
    placement: PropTypes.string,
    pointing: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    pointerRef: PropTypes.func,
    pointerStyle: PropTypes.object,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  private handleMouseEnter = e => {
    _.invoke(this.props, 'onMouseEnter', e, this.props)
  }

  private handleMouseLeave = e => {
    _.invoke(this.props, 'onMouseLeave', e, this.props)
  }

  public renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
    styles,
  }: RenderResultConfig<PopupContentProps>): React.ReactNode {
    const { children, content, pointing, pointerRef, pointerStyle } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {pointing && (
          <Ref innerRef={pointerRef}>
            {Box.create(
              {},
              {
                defaultProps: {
                  style: pointerStyle,
                  styles: styles.pointer,
                },
              },
            )}
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

PopupContent.create = createShorthandFactory({ Component: PopupContent, mappedProp: 'content' })

export default PopupContent
