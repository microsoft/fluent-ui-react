import * as React from 'react'
import { Image, Text } from '@stardust-ui/react'
import Slot from '../../../../src/components/Slot/Slot'

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
      <Slot styles={this.getSpeakerStyles()}>
        <Image src={portrait} fluid />
        <Slot styles={this.getContentStyles()}>
          <Image src={company} styles={this.getTextStyles()} />
          <Text weight="semibold" content={firstName} styles={this.getTextStyles('white')} />
          <Text weight="bold" content={lastName} styles={this.getTextStyles('white')} />
          <Text content="FULL BIO" styles={this.getTextStyles()} />
        </Slot>
      </Slot>
    )
  }

  private getTextStyles = (color?) => {
    return () => ({
      color,
      zIndex: 3,
      position: 'relative',
      display: 'block',
    })
  }

  private getContentStyles = () => {
    return () => ({
      width: '200px',
      margin: 'auto',
      position: 'relative',
      bottom: '10px',
      fontSize: '20px',
    })
  }

  private getSpeakerStyles = () => {
    return () => ({
      position: 'relative',
      width: '240px',
      '::before': {
        content: '""',
        position: 'absolute',
        height: '340px',
        left: 0,
        bottom: 0,
        display: 'block',
        width: '240px',
        // backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(rgba(94, 117, 179, 0)), color-stop(40%, rgba(94, 117, 179, 0.3)), color-stop(70%, #5e75b3), to(#5e75b3))',
        backgroundImage:
          'linear-gradient(to bottom, rgba(94, 117, 179, 0) 0%, rgba(94, 117, 179, 0.3) 40%, #5e75b3 70%, #5e75b3 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      },
      ':hover': {
        '::before': {
          backgroundImage:
            'linear-gradient(to bottom, rgba(94, 117, 179, 0) 0%, rgba(94, 117, 179, 0.3) 40%, #67b579 70%, #55af6a 100%)',
        },
      },
    })
  }
}

export default Speaker
