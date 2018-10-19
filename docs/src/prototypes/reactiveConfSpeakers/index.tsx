import * as React from 'react'
import { mainStyle } from './styles'
import Slot from '../../../../src/components/Slot/Slot'
import Navbar from './Navbar'
import SecondaryNavbar from './SecondaryNavbar'
import PageHeader from './PageHeader'
import Footer from './Footer'
import Speakers from './Speakers'

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
        <PageHeader />
        <Speakers />
        <Footer />
      </Slot>
    )
  }
}
