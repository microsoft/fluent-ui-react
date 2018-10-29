import * as React from 'react'
import { speakersGrid } from './styles'
import { speakers, SpeakerProps } from './data'
import { Grid, gridBehavior } from '@stardust-ui/react'
import Speaker from './Speaker'
import ChatPeoplePicker from '../ChatPeoplePicker/ChatPeoplePicker'
import * as Dusty from './dusties'

export default class Speakers extends React.Component<
  {},
  { filter: string; selectedPeople: any[] }
> {
  public state = { filter: '', selectedPeople: [] }

  public render() {
    return (
      <>
        <Dusty.div styles={{ margin: '45px 0 30px 0' }}>
          <ChatPeoplePicker
            items={speakers}
            inputValueChanged={(inputValue, selectedPeople) =>
              this.setState({
                filter: inputValue,
                selectedPeople,
              })
            }
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

  private applyPeopleFilter = (filter: string, speaker: SpeakerProps) => {
    const { selectedPeople } = this.state

    const anyFilter = filter && filter.length > 0
    if (!anyFilter && selectedPeople.length === 0) {
      return true
    }

    if (anyFilter) {
      return speaker.name.toLowerCase().includes(filter.toLowerCase())
    }

    return selectedPeople.some(person => person.name.toLowerCase() === speaker.name.toLowerCase())
  }
}
