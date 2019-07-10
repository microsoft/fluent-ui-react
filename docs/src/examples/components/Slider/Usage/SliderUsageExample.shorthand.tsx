import * as React from 'react'
import { Button, Slider, Flex } from '@stardust-ui/react'

const SliderUsageExampleShorthand = () => {
  const [mute, setMute] = React.useState(false)
  const [value, setValue] = React.useState<number>(undefined)
  const currentValue = React.useRef(50)

  React.useEffect(
    () => {
      currentValue.current = value
      setValue(mute ? 0 : currentValue.current)
    },
    [mute],
  )

  return (
    <Flex gap="gap.smaller">
      <Button text iconOnly icon={mute ? 'mic-off' : 'mic'} onClick={() => setMute(!mute)} />
      <Slider value={value} onChange={(e, data) => setValue(Number(data.value))} />
    </Flex>
  )
}

export default SliderUsageExampleShorthand
