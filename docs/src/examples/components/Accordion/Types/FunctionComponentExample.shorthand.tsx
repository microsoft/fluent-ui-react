import * as React from 'react'

type MyComponentProps = {
  message?: string
}

const MyFuncComponent: React.FC<MyComponentProps> = props => {
  const [clicksCount, setClicksCount] = React.useState(0)

  const handleClick = () => {
    alert(`MESSAGE: ${props.message}, clicks count: ${clicksCount}`)
  }

  return (
    <div data-tag="root">
      {' '}
      {/* Stardust styles are seen to be applied here */}
      <div data-tag="content">
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
