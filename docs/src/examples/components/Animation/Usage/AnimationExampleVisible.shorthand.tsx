import * as React from 'react'
import { Provider, Animation, Icon, Button } from '@fluentui/react'
import { useLogKnob } from '@fluentui/docs-components'
import { easeEasy } from 'src/themes/teams/animations/timingFunctions'

const AnimationExampleVisible = () => {
  const [visible, setVisible] = React.useState(false)

  const onEnter = useLogKnob('onEnter', () => {})
  const onEntering = useLogKnob('onEntering', () => {})
  const onEntered = useLogKnob('onEntered', () => {})

  const onExit = useLogKnob('onExit', () => {})
  const onExiting = useLogKnob('onExiting', () => {})
  const onExited = useLogKnob('onExited', () => {})

  return (
    <Provider
      theme={{
        animations: {
          fadeEnterSlow: {
            keyframe: {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
            duration: '500ms',
            timingFunction: easeEasy,
            fillMode: 'forwards',
          },
          fadeExitSlow: {
            keyframe: {
              '0%': { opacity: 1 },
              '100%': { opacity: 0 },
            },
            duration: '500ms',
            timingFunction: easeEasy,
            fillMode: 'forwards',
          },
        },
      }}
    >
      <Button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</Button>&emsp;
      <Animation
        visible={visible}
        timeout={{
          enter: 1000,
          exit: 2000,
        }}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        name={visible ? 'fadeEnterSlow' : 'fadeExitSlow'}
        mountOnEnter
        unmountOnExit
      >
        <Icon name="mention" circular bordered />
      </Animation>
    </Provider>
  )
}

export default AnimationExampleVisible
