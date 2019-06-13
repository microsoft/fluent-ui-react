import { Ref } from '@stardust-ui/react-component-ref'
import * as React from 'react'
import * as PropTypes from 'prop-types'
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
import { WithAsProp, withSafeTypeForAs } from '../../types'
import Box from '../Box/Box'

export interface TooltipContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** An actual placement value from Popper. */
  placement?: PopperChildrenProps['placement']

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean

  /** A ref to a pointer element. */
  pointerRef?: React.Ref<Element>
}

class TooltipContent extends UIComponent<WithAsProp<TooltipContentProps>> {
  static create: Function

  static displayName = 'TooltipContent'
  static className = 'ui-tooltip__content'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    placement: PropTypes.string,
    pointing: PropTypes.bool,
    pointerRef: customPropTypes.ref,
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  renderComponent({
    accessibility,
    ElementType,
    classes,
    unhandledProps,
    styles,
  }: RenderResultConfig<TooltipContentProps>): React.ReactNode {
    const { children, content, pointing, pointerRef } = this.props

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
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

TooltipContent.create = createShorthandFactory({ Component: TooltipContent, mappedProp: 'content' })

/**
 * A TooltipContent displays the content of a Tooltip component
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default withSafeTypeForAs<typeof TooltipContent, TooltipContentProps>(TooltipContent)
