import * as React from 'react'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import Footer from './Footer'
import Speakers from './Speakers'
import * as Dusty from './dusties'

import { defaultTheme, materialTheme } from './themes'
import { Provider, mergeThemes } from '@stardust-ui/react'

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
      // Sets theme for the subtree
      <Provider theme={mergeThemes(defaultTheme, materialTheme)}>
        <Dusty.MainContainer>
          <Navbar scrolling={scrolling} />

          <Dusty.PageContainer>
            <PageHeader />
            <Speakers />
          </Dusty.PageContainer>

          <Footer />
        </Dusty.MainContainer>
      </Provider>
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
