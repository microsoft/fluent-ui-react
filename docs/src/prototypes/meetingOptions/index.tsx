import * as React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { mainStyle } from './styles'
import Logo from './components/Logo'
import MSTeamsDivider from './components/MSTeamsDivider'
import MeetingOptions from './components/MeetingOptions'

class MeetingOptionsPrototype extends React.Component<any, any> {
  render() {
    return (
      <div style={mainStyle}>
        <Header content={<Logo icon={{ name: 'team-create' }} companyName="Microsoft Teams" />} />
        <MSTeamsDivider transparent size={40} />
        <MeetingOptions />
        <Footer content="&copy;Microsoft Corporation. All Rights reserved | Legal Notice | Privacy Policy" />
      </div>
    )
  }
}

export default MeetingOptionsPrototype
