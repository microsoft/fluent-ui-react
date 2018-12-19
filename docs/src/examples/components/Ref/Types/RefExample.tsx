import * as React from 'react'
import { Button, Grid, Ref, Segment } from '@stardust-ui/react'

type RefExampleState = {
  isMounted: boolean
}

class RefExample extends React.Component<{}, RefExampleState> {
  state = { isMounted: false }

  createdRef = React.createRef<HTMLButtonElement>()
  functionalRef = null

  handleRef = (node: HTMLButtonElement) => (this.functionalRef = node)

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  render() {
    const { isMounted } = this.state

    return (
      <Grid columns={2}>
        <Segment>
          <Ref innerRef={this.handleRef}>
            <Button primary>With functional ref</Button>
          </Ref>
          <Ref innerRef={this.createdRef}>
            <Button>
              With <code>createRef()</code>
            </Button>
          </Ref>
        </Segment>

        {isMounted && (
          <code style={{ margin: 10 }}>
            <pre>
              {JSON.stringify(
                {
                  nodeName: this.functionalRef.nodeName,
                  nodeType: this.functionalRef.nodeType,
                  textContent: this.functionalRef.textContent,
                },
                null,
                2,
              )}
            </pre>
            <pre>
              {JSON.stringify(
                {
                  nodeName: this.createdRef.current.nodeName,
                  nodeType: this.createdRef.current.nodeType,
                  textContent: this.createdRef.current.textContent,
                },
                null,
                2,
              )}
            </pre>
          </code>
        )}
      </Grid>
    )
  }
}

export default RefExample
