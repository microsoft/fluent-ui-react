import * as React from 'react'
import Speaker from './Speaker'
import { mainStyle, speakersGrid } from './styles'
import Slot from '../../../../src/components/Slot/Slot'
import { Grid } from '@stardust-ui/react'
import { speakers } from './data'
import Navbar from './Navbar'
import SecondaryNavbar from './SecondaryNavbar'

export default class ReactiveCongSpeakers extends React.Component<{}, any> {
  state = { scrolling: false }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = event => {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({ scrolling: false })
    } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({ scrolling: true })
    }
  }

  render() {
    const { scrolling } = this.state
    return (
      <Slot styles={mainStyle}>
        <Navbar />
        <SecondaryNavbar scrolling={scrolling} />
        <Grid columns="4" styles={speakersGrid} variables={{ gridGap: '10px' }}>
          {speakers.map(speaker => {
            return <Speaker {...speaker} />
          })}
        </Grid>
      </Slot>
    )
  }
}
