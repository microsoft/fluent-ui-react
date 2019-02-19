import * as React from 'react'
import { Segment } from '@stardust-ui/react'

type ComponentProps = {
  expanded?: boolean
}

class MyComponent extends React.Component<ComponentProps> {
  private _containerRef: any = React.createRef()

  render() {
    const styles = {
      width: this.props.expanded ? '100%' : '80px',
      height: '100%',
      background: 'green',
    }

    return <Segment style={styles} ref={this._containerRef} />
  }
}

const SegmentExample = () => <MyComponent expanded={false} />

export default SegmentExample
