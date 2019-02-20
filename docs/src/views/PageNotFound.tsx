import * as React from 'react'
import { Grid, Segment, Header, Icon } from '@stardust-ui/react'

const PageNotFound = () => (
  <Grid>
    <div>
      <Header as="h1" icon textAlign="center">
        <Icon name="game" />
        404
        <Header.Description>How about some good old Atari?</Header.Description>
      </Header>
    </div>

    <div>
      <Segment basic>
        <embed
          src="http://www.pizn.com/swf/classic-asteroids.swf"
          width="425"
          height="318"
          {...{
            align: 'center',
            quality: 'high',
            pluginspage: 'http://www.macromedia.com/go/getflashplayer',
            type: 'application/x-shockwave-flash',
          }}
          style={{ zoom: '1.13' }}
        />
      </Segment>
    </div>
    <div>
      <Segment basic>
        <embed
          src="http://www.pizn.com/swf/1-space-invaders.swf"
          width="425"
          height="359"
          {...{
            align: 'center',
            quality: 'high',
            pluginspage: 'http://www.macromedia.com/go/getflashplayer',
            type: 'application/x-shockwave-flash',
          }}
        />
      </Segment>
    </div>
  </Grid>
)

export default PageNotFound
