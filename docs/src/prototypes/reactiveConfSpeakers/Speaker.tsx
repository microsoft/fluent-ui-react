import * as React from 'react'
import { Image, Text, Button } from '@stardust-ui/react'
import { speakerCard, speakerCardContent, speakerText, speakerImage, speakerButton } from './styles'
import { mergeStyles } from './utils'
import { paper as md_paper, card as md_card } from './styles/materialStyles'

import Dusty from './dusties'
import { SpeakerProps } from './data'

class Speaker extends React.Component<SpeakerProps> {
  public render() {
    const { firstName, lastName, image, companyLogo } = this.props
    return (
      <Dusty.div styles={mergeStyles(speakerCard, md_card)}>
        <Image src={image} fluid />
        <Dusty.div styles={speakerCardContent}>
          <Image src={companyLogo} styles={speakerImage} />
          <Text weight="semibold" content={firstName} styles={speakerText} />
          <Text weight="bold" content={lastName} styles={speakerText} />
          <Button content="FULL BIO" styles={mergeStyles(speakerButton, md_paper(3))} />
        </Dusty.div>
      </Dusty.div>
    )
  }
}

export default Speaker
