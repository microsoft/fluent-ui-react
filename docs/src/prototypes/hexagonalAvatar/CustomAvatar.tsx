import * as React from 'react'
import { Avatar as StardustAvatar, AvatarProps, callable } from '@stardust-ui/react'

const Avatar = (props: AvatarProps & { hexagonal?: boolean }) => {
  const { hexagonal, variables: propVariables, ...rest } = props
  const variables = siteVars => {
    return {
      ...(hexagonal && {
        // these values are defined for the medium size avatar,
        // but can be exptended if we need to support different
        // hexagonal avatar sizes
        width: '36px',
        height: '32px',
        clipPath: siteVars.hexClipPath,
        borderRadius: '0px',
        avatarBorderColor: '',
        avatarBorderWidth: 0,
      }),
      ...callable(propVariables)(siteVars),
    }
  }
  return <StardustAvatar {...rest} variables={variables} />
}

export default Avatar
