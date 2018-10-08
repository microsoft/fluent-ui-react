import * as React from 'react'
import MSTeamsHeader from './components/MSTeamsHeader'
import MSTeamsFooter from './components/MSTeamsFooter'
import { mainStyle } from './styles'
import MSTeamsLogo from './components/MSTeamsLogo'
import MSTeamsDivider from './components/MSTeamsDivider'
import MSTeamsMeetingOptions from './components/MSTeamsMeetingOptions'
import MSTeamsLink from './components/MSTeamsLink'

class MeetingOptionsPrototype extends React.Component<any, any> {
  render() {
    return (
      <div style={mainStyle}>
        <MSTeamsHeader
          content={<MSTeamsLogo icon={{ name: 'team-create' }} companyName="Microsoft Teams" />}
        />
        <MSTeamsDivider transparent size={40} />
        <MSTeamsMeetingOptions />
        <MSTeamsFooter
          content={
            <span>
              &copy;Microsoft Corporation. All Rights reserved |{' '}
              <MSTeamsLink content="Legal Notice" /> | <MSTeamsLink content="Privacy Policy" />
            </span>
          }
        />
      </div>
    )
  }
}

export default MeetingOptionsPrototype
