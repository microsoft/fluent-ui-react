import * as React from 'react'
import Navbar from './Navbar'
import PageHeader from './PageHeader'
import Footer from './Footer'
import Speakers from './Speakers'
import Dusty from './dusties'
import { Provider } from '@stardust-ui/react'

import { mergeStyles } from './utils'
import { main } from './styles'
import { container as md_container } from './styles/materialStyles'

export default class ReactiveCongSpeakers extends React.Component<{}, any> {
  state = { scrolling: false }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = event => {
    if (window.scrollY === 0 && this.state.scrolling) {
      this.setState({ scrolling: false })
    } else if (window.scrollY !== 0 && !this.state.scrolling) {
      this.setState({ scrolling: true })
    }
  }

  render() {
    const { scrolling } = this.state
    return (
      <Provider
        theme={{
          componentStyles: {
            'Dusty.div': {
              root: () => ({
                ':hover': { border: '1px solid red' },
              }), // suppose that we would be able to simplify this syntax
            },
          },
        }}
      >
        <Dusty.div styles={mergeStyles(main, md_container)}>
          <Navbar scrolling={scrolling} />
          <PageHeader />
          <Speakers />
          <Footer />
        </Dusty.div>
      </Provider>
    )
  }
}
