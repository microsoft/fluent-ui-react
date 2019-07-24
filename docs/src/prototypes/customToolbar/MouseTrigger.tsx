import * as React from 'react'
import { Segment } from '@stardust-ui/react'

const activate = setter => () => {
  setter(true)
  setTimeout(() => {
    setter(false)
  }, 300 * 1000)
}

// this is intentionally not accessible as we are going to use mouse event
// to execute something -> simulating application triggered event
// do not try this at home
const MouseTrigger = ({ content, setter }) => {
  return <Segment content={content} onMouseEnter={activate(setter)} />
}

export default MouseTrigger
