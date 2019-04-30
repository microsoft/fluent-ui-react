import { useBooleanKnob, useRangeKnob } from '@stardust-ui/docs-components'
import { List, Image } from '@stardust-ui/react'
import * as React from 'react'

const items = [
  {
    key: 'irving',
    media: <Image src="public/images/avatar/small/matt.jpg" avatar />,
    header: 'Irving Kuhic - Super long title here',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
    contentMedia: '!!',
  },
  {
    key: 'skyler',
    media: <Image src="public/images/avatar/small/steve.jpg" avatar />,
    header: 'Skyler Parks - Super long title here',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
    contentMedia: '!!',
  },
  {
    key: 'dante',
    media: <Image src="public/images/avatar/small/nom.jpg" avatar />,
    header: 'Dante Schneider - Super long title here',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
    contentMedia: '!!',
  },
]

const ListExample = () => {
  const [debug] = useBooleanKnob({ name: 'debug' })
  const [truncateContent] = useBooleanKnob({ name: 'truncateContent', initialValue: true })
  const [truncateHeader] = useBooleanKnob({ name: 'truncateHeader', initialValue: true })
  const [width] = useRangeKnob({ name: 'width', initialValue: '25rem' })

  return (
    <div style={{ width }}>
      <List
        debug={debug}
        truncateHeader={truncateHeader}
        truncateContent={truncateContent}
        items={items}
      />
    </div>
  )
}

export default ListExample
