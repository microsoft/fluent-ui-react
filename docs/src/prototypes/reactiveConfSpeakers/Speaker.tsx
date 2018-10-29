import * as React from 'react'
import { Image, Text, Button } from '@stardust-ui/react'
import { speakerText, speakerImage, speakerButton } from './styles'
import { dustify, mergeStyles } from './utils'
import { paper as md_paper } from './themes/materialUtils'

import { SpeakerCardContent } from './dusties'
import { SpeakerProps } from './data'

const Speaker = ({
  firstName,
  lastName,
  image,
  companyLogo,
  className,
}: SpeakerProps & { className: string }) => (
  <div className={className}>
    <Image src={image} fluid />

    <SpeakerCardContent>
      <Image src={companyLogo} styles={speakerImage} />
      <Text weight="semibold" content={firstName} styles={speakerText} />
      <Text weight="bold" content={lastName} styles={speakerText} />
      <Button content="FULL BIO" styles={mergeStyles(speakerButton, md_paper(5))} />
    </SpeakerCardContent>
  </div>
)

export default dustify(Speaker)
