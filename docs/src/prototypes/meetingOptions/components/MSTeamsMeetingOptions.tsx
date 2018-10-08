import * as React from 'react'
import { Layout, Grid, Button, Text, Icon, Input, Header } from '@stardust-ui/react'
import { middleColumnStyles } from '../styles'
import MSTeamsDivider from './MSTeamsDivider'

export default () => {
  return (
    <div>
      <MSTeamsDivider transparent size={40} />
      <div style={middleColumnStyles}>
        <Header as="h3" content="Fluent Design - Introduction" />
        <Layout
          start={<Icon name="calendar" xSpacing="after" />}
          main={<Text content="10 January 2018, 12:00 PM - 1:00 PM" />}
        />
        <Layout start={<Icon name="user" xSpacing="after" />} main={<Text content="John Doe" />} />
        <MSTeamsDivider transparent size={40} />
        <Header as="h3" content="Meeting Options" />
        <MSTeamsDivider />
        <Grid columns="1fr 1fr">
          <Text
            content="Who can byppass the lobby?"
            weight="semibold"
            style={{ lineHeight: '40px' }}
          />
          <Input placeholder="People in my organization" fluid />
        </Grid>
        <MSTeamsDivider transparent size={10} />
        <Button type="primary" content="Save" styles={{ float: 'right', margin: '0px' }} />
      </div>
    </div>
  )
}
