import * as React from 'react'
import { Image, Text } from '@stardust-ui/react'
import Slot from '../../../../src/components/Slot/Slot'
import {
  speakerStyles,
  speakerContentStyles,
  speakerTextStyles,
  speakerImageStyles,
} from './styles'

export interface ISpeakerProps {
  firstName?: string
  lastName?: string
  portrait?: string
  company?: string
}

class Speaker extends React.Component<ISpeakerProps> {
  public render() {
    const { firstName, lastName, portrait, company } = this.props
    return (
      <Slot styles={speakerStyles}>
        <Image src={portrait} fluid />
        <Slot styles={speakerContentStyles}>
          <Image src={company} styles={speakerImageStyles} />
          <Text weight="semibold" content={firstName} styles={speakerTextStyles} />
          <Text weight="bold" content={lastName} styles={speakerTextStyles} />
          <Text content="FULL BIO" styles={{ ...speakerTextStyles, color: '#192b4f' }} />
        </Slot>
      </Slot>
    )
  }
}

export default Speaker
