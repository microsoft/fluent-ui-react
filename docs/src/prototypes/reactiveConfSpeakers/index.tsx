import * as React from 'react'
import { Provider } from '@stardust-ui/react'
import { mainStyles, defaultMenuItemStyles, defaultMenuStyles } from './styles'
import siteVariables, { SiteVariables } from './siteVariables'
import Slot from '../../../../src/components/Slot/Slot'
import Navbar from './Navbar'
import SecondaryNavbar from './SecondaryNavbar'
import PageHeader from './PageHeader'
import Footer from './Footer'
import Speakers from './Speakers'

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
      <Provider
        theme={{
          siteVariables,

          componentStyles: {
            MenuItem: {
              root: defaultMenuItemStyles,
            },
            Menu: {
              root: defaultMenuStyles,
            },
          },

          componentVariables: {
            Divider: (siteVars: SiteVariables) => ({
              dividerColor: siteVars.green,
            }),
            Menu: (siteVars: SiteVariables) => ({
              defaultColor: siteVars.white,
              typePrimaryActiveColor: siteVars.green,
              typePrimaryActiveBackgroundColor: 'transparent',
            }),
          },
        }}
      >
        <Slot styles={mainStyles}>
          <Navbar />
          <SecondaryNavbar scrolling={scrolling} />
          <PageHeader />
          <Speakers />
          <Footer />
        </Slot>
      </Provider>
    )
  }

  private handleScroll = () => {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({ scrolling: false })
    } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({ scrolling: true })
    }
  }
}
