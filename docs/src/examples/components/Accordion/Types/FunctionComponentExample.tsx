import * as React from 'react'
import { useStardust } from '@stardust-ui/react'

type MyComponentProps = {
  message?: string
}

const MyFuncComponent: React.FC<MyComponentProps> = props => {
  const [clicksCount, setClicksCount] = React.useState(0)

  const handleClick = () => {
    alert(`MESSAGE: ${props.message}, clicks count: ${clicksCount}`)
  }

  const { classes } = useStardust(
    'MyComponent',
    props,
    { clicksCount }, // optional state bits used in styles
  )

  return (
    <div data-tag="root" className={classes.root}>
      {' '}
      {/* Stardust styles are seen to be applied here */}
      <div data-tag="content" className={classes.content}>
        {' '}
        {/* Stardust styles are seen to be applied here */}
        <button
          onClick={() => {
            handleClick()
            setClicksCount(clicksCount + 1)
          }}
        >
          Click me!
        </button>
      </div>
    </div>
  )
}

const Example = () => <MyFuncComponent message="hello /" />

export default Example
