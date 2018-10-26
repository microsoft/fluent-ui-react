import * as React from 'react'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import Footer from './Footer'
import Speakers from './Speakers'
import Dusty from './dusties'

import { mergeStyles } from './utils'
import { main, pageContainer } from './styles'
import { container as md_container } from './styles/materialStyles'

export default class ReactiveConfSpeakers extends React.Component<{}, { scrolling: boolean }> {
  state = { scrolling: false }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { scrolling } = this.state
    return (
      <Dusty.div styles={mergeStyles(main, md_container)}>
        <Navbar scrolling={scrolling} />

        <Dusty.div styles={pageContainer}>
          <PageHeader />
          <Speakers />
        </Dusty.div>

        <Footer />
      </Dusty.div>
    )
  }

  private handleScroll = e => {
    if (window.scrollY === 0 && this.state.scrolling) {
      this.setState({ scrolling: false })
    } else if (window.scrollY !== 0 && !this.state.scrolling) {
      this.setState({ scrolling: true })
    }
  }
}
