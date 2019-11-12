import * as React from 'react'
import { Avatar as StardustAvatar, AvatarProps } from '@stardust-ui/react'

const Avatar = (props: AvatarProps & { hexagonal?: boolean }) => {
  const { hexagonal, ...rest } = props

  if (hexagonal) {
    return (
      <StardustAvatar
        {...rest}
        image={render =>
          render(rest.image, (Component, props) => {
            const { src, ...restImageProps } = props
            return (
              <svg
                viewBox="0 0 34 34"
                role="img"
                id="hexagon-mask"
                aria-labelledby="hexagon-mask"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  fill="transparent"
                  clipPath="url(#bot-hexagon-clip-path)"
                  width="34px"
                  height="34px"
                />
                <Component
                  as="image"
                  clipPath="url(#bot-hexagon-clip-path)"
                  width="34px"
                  height="34px"
                  xlinkHref={src}
                  {...restImageProps}
                />
              </svg>
            )
          })
        }
      />
    )
  }
  return <StardustAvatar {...rest} />
}

export default Avatar
