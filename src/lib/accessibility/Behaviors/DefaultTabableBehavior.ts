import { IAccessibilityDefinition } from '../interfaces'

const DefaultTabableBehavior: (props: any) => IAccessibilityDefinition = (props: any) => {
  return {
    attributes: {
      root: {
        tabIndex: props.isFocused ? '0' : '-1',
      },
    },
  }
}

export default DefaultTabableBehavior
