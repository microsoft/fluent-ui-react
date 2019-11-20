import { Divider as StardustUIDivider } from '@fluentui/react'

export default props => {
  return StardustUIDivider.create(props, {
    defaultProps: () => ({
      variables: { dividerColor: 'transparent' },
    }),
  })
}
