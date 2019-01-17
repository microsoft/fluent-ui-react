import * as React from 'react'
import {
  Divider,
  Layout,
  Grid,
  Button,
  Text,
  Icon,
  Input,
  Header,
  Provider,
} from '@stardust-ui/react'
import { middleColumnStyles } from '../styles'
import TransparentDivider from './TransparentDivider'

export default () => {
  return (
    <Provider.Consumer
      render={({ siteVariables }) => {
        return (
          <div style={{ background: siteVariables.chatBackground, height: '100%' }}>
            <Divider fitted />
            <TransparentDivider size={40} />
            <div style={middleColumnStyles}>
              <Header as="h3" content="Fluent Design - Introduction" />
              <Layout
                start={<Icon name="calendar" xSpacing="after" />}
                main={<Text content="10 January 2018, 12:00 PM - 1:00 PM" />}
                styles={{ color: siteVariables.bodyColor }}
              />
              <Layout
                start={<Icon name="user" xSpacing="after" />}
                main={<Text content="John Doe" />}
                styles={{ color: siteVariables.bodyColor }}
              />
              <TransparentDivider size={40} />
              <Header as="h3" content="Meeting Options" />
              <TransparentDivider />
              <Grid columns="1fr 1fr">
                <Text
                  content="Who can byppass the lobby?"
                  weight="semibold"
                  style={{ lineHeight: '40px' }}
                  styles={{ color: siteVariables.bodyColor }}
                />
                <Input placeholder="People in my organization" fluid inverted />
              </Grid>
              <TransparentDivider size={10} />
              <Button content="Save" styles={{ float: 'right', margin: '0px' }} primary />
            </div>
          </div>
        )
      }}
    />
  )
}
