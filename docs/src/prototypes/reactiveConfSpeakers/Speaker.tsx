import * as React from 'react'
import { Image, Text } from '@stardust-ui/react'
import Slot from '../../../../src/components/Slot/Slot'
import {
  speakerStyles,
  speakerContentStyles,
  speakerTextStyles,
  speakerImageStyles,
} from './styles'
import { SpeakerProps } from './data'

class Speaker extends React.Component<SpeakerProps> {
  public render() {
    const { firstName, lastName, image, companyLogo } = this.props
    return (
      <Slot data-is-focusable="true" styles={speakerStyles}>
        <Image src={image} fluid />
        <Slot styles={speakerContentStyles}>
          <Image src={companyLogo} styles={speakerImageStyles} />
          <Text weight="semibold" content={firstName} styles={speakerTextStyles} />
          <Text weight="bold" content={lastName} styles={speakerTextStyles} />
          <Text content="FULL BIO" styles={{ ...speakerTextStyles, color: '#192b4f' }} />
        </Slot>
      </Slot>
    )
  }
}

export default Speaker
