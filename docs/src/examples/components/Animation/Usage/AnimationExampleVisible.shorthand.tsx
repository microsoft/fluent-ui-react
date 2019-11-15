import * as React from 'react'
import { Provider, Animation, Icon, Button } from '@stardust-ui/react'
import { useLogKnob } from '@stardust-ui/docs-components'
import { createCallbackLogFormatter } from '@stardust-ui/code-sandbox'
import { easeEasy } from 'src/themes/teams/animations/timingFunctions'

const AnimationExampleVisible = () => {
  const [visible, setVisible] = React.useState(false)

  const onComplete = useLogKnob('onComplete', () => {}, createCallbackLogFormatter(['status']))

  const onShow = useLogKnob('onShow', () => {}, createCallbackLogFormatter(['status']))

  const onHide = useLogKnob('onHide', () => {}, createCallbackLogFormatter(['status']))

  const onStart = useLogKnob('onStart', () => {}, createCallbackLogFormatter(['status']))

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
      <Button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</Button>
      <Animation
        visible={visible}
        duration={{
          show: '1s',
          hide: '2s',
        }}
        onComplete={onComplete}
        onShow={onShow}
        onHide={onHide}
        onStart={onStart}
        name={visible ? 'fadeEnterSlow' : 'fadeExitSlow'}
        mountOnShow
        unmountOnHide
      >
        <Icon name="mention" circular bordered />
      </Animation>
    </Provider>
  )
}

export default AnimationExampleVisible
