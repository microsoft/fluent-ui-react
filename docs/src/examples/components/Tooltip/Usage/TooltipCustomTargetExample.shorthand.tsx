import * as React from 'react'
import { Tooltip, Button, Divider, Text, Grid, Ref } from '@stardust-ui/react'

class TooltipExample extends React.Component {
  ref = React.createRef<any>()

  render() {
    return (
      <Grid columns="auto 1fr">
        {/* CUSTOM DOM ELEMENT is used as target for Tooltip */}
        <Tooltip
          target={this.ref.current}
          trigger={<Button icon="question" circular styles={{ cursor: 'pointer' }} />}
          content="well, yes, I am just a garbish text ¯\_(ツ)_/¯"
          position="below"
        />

        <div style={{ marginLeft: 10 }}>
          <Text>Could you guess what does this text means? :)</Text>
          <Divider />
          <Ref innerRef={this.ref}>
            <Text ref={this.ref}>
              "To the lascivious looking-glass I, that love's majesty to strut before a want love's
              majesto, to the souls of York."
            </Text>
          </Ref>
        </div>
      </Grid>
    )
  }
}

export default TooltipExample
