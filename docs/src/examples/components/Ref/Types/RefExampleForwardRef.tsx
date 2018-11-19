import React from 'react'
import { Grid, Ref, Segment } from '@stardust-ui/react'

const ExampleButton = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <div>
    <button {...props} ref={ref} />
  </div>
))

class RefExampleForwardRef extends React.Component {
  state = { isMounted: false }

  forwardedRef = React.createRef<HTMLButtonElement>()

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  render() {
    const { isMounted } = this.state
    const buttonNode = this.forwardedRef.current

    return (
      <Grid columns={2}>
        <Segment>
          <p>
            A button below uses <code>forwardRef</code> API.
          </p>

          <Ref innerRef={this.forwardedRef}>
            <ExampleButton>A button</ExampleButton>
          </Ref>
        </Segment>

        {isMounted && (
          <code style={{ margin: 10 }}>
            <pre>
              {JSON.stringify(
                {
                  nodeName: buttonNode.nodeName,
                  nodeType: buttonNode.nodeType,
                  textContent: buttonNode.textContent,
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

export default RefExampleForwardRef
