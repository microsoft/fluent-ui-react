import { Ref } from '@stardust-ui/react-component-ref'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'

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
import { PopperChildrenProps } from '../../lib/positioner'
import { WithAsProp, ComponentEventHandler, withSafeTypeForAs } from '../../types'
import Box from '../Box/Box'

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
  pointerRef?: React.Ref<Element>

  /**
   * @deprecated
   * Indicates that PopupContent is wrapped with FocusZone. Do not use it, it used only for internal implementation and
   * will be removed in future releases.
   */
  unstable_wrapped?: boolean
}

class PopupContent extends UIComponent<WithAsProp<PopupContentProps>> {
  static create: Function

  static displayName = 'PopupContent'
  static className = 'ui-popup__content'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    placement: PropTypes.string,
    pointing: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    pointerRef: customPropTypes.ref,
    unstable_wrapped: PropTypes.bool,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  handleMouseEnter = e => {
    _.invoke(this.props, 'onMouseEnter', e, this.props)
  }

  handleMouseLeave = e => {
    _.invoke(this.props, 'onMouseLeave', e, this.props)
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
    styles,
  }: RenderResultConfig<PopupContentProps>): React.ReactNode {
    const { children, content, pointing, pointerRef } = this.props

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
            {Box.create({}, { defaultProps: { styles: styles.pointer } })}
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

/**
 * A PopupContent displays the content of a Popup component
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default withSafeTypeForAs<typeof PopupContent, PopupContentProps>(PopupContent)
