import * as React from 'react'
import { compose } from '@fluentui/react-theming'

export const BaseButton: React.FunctionComponent<any> = props => {
  const { root: rootClasses = '' } = props.classes
  // TODO this should use getNativeProps to pass the correct props to `button`
  return <button {...props} className={rootClasses} />
}

export const DemoButton = compose(BaseButton, {
  styles: () => {
    return {
      root: {
        background: 'red',
      },
    }
  },
})
