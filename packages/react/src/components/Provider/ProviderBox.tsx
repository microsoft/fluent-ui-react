import * as React from 'react'
import {
  commonPropTypes,
  ContentComponentProps,
  ChildrenComponentProps,
  UIComponentProps,
} from '../../lib'
import createComponent from '../../lib/createComponent'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface ProviderBoxProps
  extends UIComponentProps<ProviderBoxProps>,
    ContentComponentProps,
    ChildrenComponentProps {}

const ProviderBox = createComponent<WithAsProp<ProviderBoxProps>>({
  displayName: 'ProviderBox',

  className: 'ui-provider__box',

  propTypes: {
    ...commonPropTypes.createCommon(),
  },

  render(config, props) {
    const { ElementType, classes, unhandledProps } = config
    const { children } = props
    if (ElementType === React.Fragment) {
      // do not spread anything - React.Fragment can only have `key` and `children` props.
      return <>{children}</>
    }

    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {children}
      </ElementType>
    )
  },
})

/**
 * The ProviderBox passes the CSS-in-JS renderer, theme styles and other settings to Stardust components.
 * Also, being comapred to Provider, it additionally renders an element to the DOM (`div` by default).
 */
export default withSafeTypeForAs<typeof ProviderBox, ProviderBoxProps>(ProviderBox)
