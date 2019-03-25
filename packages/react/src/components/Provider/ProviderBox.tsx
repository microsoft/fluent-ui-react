import * as React from 'react'
import { commonPropTypes } from '../../lib'
import createComponent, { CreateComponentReturnType } from '../../lib/createComponent'
import { ReactProps } from '../../types'
import { isFragment } from 'react-is'

const ProviderBox: CreateComponentReturnType<ReactProps<{}>> = createComponent<any>({
  displayName: 'ProviderBox',

  className: 'ui-provider__box',

  propTypes: {
    ...commonPropTypes.createCommon(),
  },

  render(config, props) {
    const { ElementType, classes, unhandledProps } = config
    const { children } = props
    if (isFragment(<ElementType />)) {
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

export default ProviderBox
