import { Divider as StardustUIDivider } from '@stardust-ui/react'

export default props => {
  const { transparent, ...divider } = props
  return StardustUIDivider.create(divider, {
    defaultProps: {
      variables: transparent ? { dividerColor: 'transparent' } : {},
    },
  })
}
