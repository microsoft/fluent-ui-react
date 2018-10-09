import { Divider as StardustUIDivider } from '@stardust-ui/react'

export default props => {
  return StardustUIDivider.create(props, {
    defaultProps: {
      variables: { dividerColor: 'transparent' },
    },
  })
}
