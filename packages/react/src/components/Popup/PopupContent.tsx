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
import {
  FocusTrapZone,
  FocusTrapZoneProps,
  AutoFocusZoneProps,
  AutoFocusZone,
} from '../../lib/accessibility/FocusZone'
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

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value. */
  trapFocus?: boolean | FocusTrapZoneProps

  /** Controls whether or not auto focus should be applied, using boolean or AutoFocusZoneProps type value. */
  autoFocus?: boolean | AutoFocusZoneProps
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
    trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    autoFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
    const { children, content, pointing, pointerRef, trapFocus, autoFocus } = this.props

    const popupContentProps: PopupContentProps = {
      className: classes.root,
      ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
      ...accessibility.attributes.root,
      ...unhandledProps,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    }
    const focusTrapZoneProps: FocusTrapZoneProps | {} =
      (_.keys(trapFocus).length && {
        ...popupContentProps,
        ...(trapFocus as FocusTrapZoneProps),
        as: ElementType,
      }) ||
      {}

    const autoFocusZoneProps: AutoFocusZoneProps | {} =
      (_.keys(autoFocus).length && {
        ...popupContentProps,
        ...(autoFocus as AutoFocusZoneProps),
        as: ElementType,
      }) ||
      {}

    const popupContent = (
      <>
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
      </>
    )

    return trapFocus ? (
      <FocusTrapZone {...focusTrapZoneProps}>{popupContent}</FocusTrapZone>
    ) : autoFocus ? (
      <AutoFocusZone {...autoFocusZoneProps}>{popupContent}</AutoFocusZone>
    ) : (
      <ElementType {...popupContentProps}>{popupContent}</ElementType>
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
