import * as React from 'react'
import { mainContentStyles, defaultSpacingStyles } from './styles'
import { speakers, SpeakerProps } from './data'
import { Grid, gridBehavior } from '@stardust-ui/react'
import Speaker from './Speaker'
import ChatPeoplePicker from '../ChatPeoplePicker/ChatPeoplePicker'

export default class Speakers extends React.Component<{}, { inputValue: string }> {
  public state = { inputValue: '' }

  public render() {
    return (
      <>
        <ChatPeoplePicker
          items={speakers}
          inputValueChanged={this.handeInputValueChanged}
          filter={this.filterPeopleFn}
          width="30rem"
          style={defaultSpacingStyles}
        />
        <Grid
          accessibility={gridBehavior}
          columns="4"
          styles={mainContentStyles}
          variables={{ gridGap: '10px' }}
        >
          {speakers
            .filter(speaker => this.filterPeopleFn(this.state.inputValue, speaker))
            .map(speaker => <Speaker {...speaker} />)}
        </Grid>
      </>
    )
  }

  private handeInputValueChanged = (inputValue: string) => this.setState({ inputValue })

  private filterPeopleFn = (inputValue: string, item: SpeakerProps) => {
    const inputVal = inputValue.toLowerCase()
    return !![item.name, item.description]
      .map(str => str.toLowerCase())
      .find(value => value.includes(inputVal))
  }
}
