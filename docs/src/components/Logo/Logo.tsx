import * as React from 'react'
import { Image, ImageProps } from '@fluentui/react'

export type LogoProps = ImageProps & {
  flavor?: 'black' | 'white' | 'inverted'
}

const Logo: React.SFC<LogoProps> = ({ flavor, ...props }) => (
  <Image {...props} src={`public/images/fluent-ui-logo${flavor ? `-${flavor}` : ''}.png`} />
)

export default Logo
