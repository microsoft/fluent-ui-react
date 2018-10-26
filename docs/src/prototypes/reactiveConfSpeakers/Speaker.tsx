import * as React from 'react'
import { Image, Text, Button } from '@stardust-ui/react'
import { speakerCard, speakerCardContent, speakerText, speakerImage } from './styles'
import { mergeStyles } from './utils'
import { paper as md_paper, card as md_card } from './styles/materialStyles'

import Dusty from './dusties'

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
      <Dusty.div styles={mergeStyles(speakerCard, md_card)}>
        <Image src={portrait} fluid />
        <Dusty.div styles={speakerCardContent}>
          <Image src={company} styles={speakerImage} />
          <Text weight="semibold" content={firstName} styles={speakerText} />
          <Text weight="bold" content={lastName} styles={speakerText} />
          <Button content="FULL BIO" styles={mergeStyles(speakerText, md_paper(3))} />
        </Dusty.div>
      </Dusty.div>
    )
  }
}

export default Speaker
