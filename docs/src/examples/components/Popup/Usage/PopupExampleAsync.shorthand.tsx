import * as React from 'react'
import { Button, Popup, Segment, Loader } from '@stardust-ui/react'

const AsyncDataLoader: React.FunctionComponent<{ onLoaded: Function }> = props => {
  const [data, setData] = React.useState<React.ReactElement>(<Loader />)

  React.useEffect(() => {
    setTimeout(() => {
      setData(<Segment styles={{ minHeight: '300px' }}>Hello from loaded data!</Segment>)
      props.onLoaded()
    }, 1000)
  }, [])

  return data
}

const PopupExampleAsync = () => {
  const [loading, setLoading] = React.useState<boolean>(true)
  return (
    <Popup
      onOpenChange={(e, data) => {
        if (!data.open) setLoading(true)
      }}
      trigger={<Button icon="expand" content="Click me!" />}
      positioningDependencies={[loading]}
      content={{ content: <AsyncDataLoader onLoaded={() => setLoading(false)} /> }}
    />
  )
}

export default PopupExampleAsync
