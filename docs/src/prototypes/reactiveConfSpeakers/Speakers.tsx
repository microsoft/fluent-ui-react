import * as React from 'react'
import { speakersGrid } from './styles'
import { speakers, SpeakerProps } from './data'
import { Grid, gridBehavior } from '@stardust-ui/react'
import Speaker from './Speaker'
import ChatPeoplePicker from '../ChatPeoplePicker/ChatPeoplePicker'
import Dusty from './dusties'

export default class Speakers extends React.Component<{}, { filter: string }> {
  public state = { filter: '' }

  public render() {
    return (
      <>
        <Dusty.div styles={{ margin: '45px 0 30px 0' }}>
          <ChatPeoplePicker
            items={speakers}
            inputValueChanged={inputValue => this.setState({ filter: inputValue })}
            filter={this.applyPeopleFilter}
            width="30rem"
          />
        </Dusty.div>

        <Grid
          accessibility={gridBehavior}
          columns="4"
          styles={speakersGrid}
          variables={{ gridGap: '10px' }}
        >
          {speakers
            .filter(speaker => this.applyPeopleFilter(this.state.filter, speaker))
            .map(speaker => <Speaker {...speaker} />)}
        </Grid>
      </>
    )
  }

  private applyPeopleFilter = (filter: string, item: SpeakerProps) => {
    const match = [item.name, item.description]
      .map(str => str.toLowerCase())
      .find(value => value.includes(filter.toLowerCase()))

    return !!match
  }
}
