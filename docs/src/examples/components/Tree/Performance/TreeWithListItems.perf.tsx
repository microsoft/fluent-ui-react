import { Tree, Image, List } from '@fluentui/react'
import * as React from 'react'

const items = [
  {
    id: '1',
    title: 'House Lannister',
    items: [
      {
        id: '11',
        key: 'irving',
        title: {
          media: <Image src="public/images/avatar/small/matt.jpg" avatar />,
          header: 'Irving Kuhic',
          headerMedia: '7:26:56 AM',
          content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
        },
      },
      {
        id: '12',
        key: 'skyler',
        title: {
          media: <Image src="public/images/avatar/small/steve.jpg" avatar />,
          header: 'Skyler Parks',
          headerMedia: '11:30:17 PM',
          content: 'Use the online FTP application to input the multi-byte application!',
        },
      },
      {
        id: '13',
        key: 'dante',
        title: {
          media: <Image src="public/images/avatar/small/nom.jpg" avatar />,
          header: 'Dante Schneider',
          headerMedia: '5:22:40 PM',
          content: 'The GB pixel is down, navigate the virtual interface!',
        },
      },
    ],
  },
  {
    id: '2',
    title: 'House Targaryen',
    items: [
      {
        id: '21',
        key: 'irving',
        title: {
          media: <Image src="public/images/avatar/small/matt.jpg" avatar />,
          header: 'Irving Kuhic',
          headerMedia: '7:26:56 AM',
          content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
        },
      },
      {
        id: '22',
        key: 'skyler',
        title: {
          media: <Image src="public/images/avatar/small/steve.jpg" avatar />,
          header: 'Skyler Parks',
          headerMedia: '11:30:17 PM',
          content: 'Use the online FTP application to input the multi-byte application!',
        },
      },
      {
        id: '23',
        key: 'dante',
        title: {
          media: <Image src="public/images/avatar/small/nom.jpg" avatar />,
          header: 'Dante Schneider',
          headerMedia: '5:22:40 PM',
          content: 'The GB pixel is down, navigate the virtual interface!',
        },
      },
    ],
  },
]

const titleRenderer = (Component, { content, header, headerMedia, media, ...restProps }) => {
  return !header ? (
    <Component {...restProps}>{content}</Component>
  ) : (
    <List.Item
      {...restProps}
      content={content}
      header={header}
      headerMedia={headerMedia}
      media={media}
    />
  )
}

const TreeWithListItemsPerf = () => (
  <Tree items={items} defaultActiveItemIds={['1', '2']} renderItemTitle={titleRenderer} />
)

TreeWithListItemsPerf.iterations = 5000
TreeWithListItemsPerf.filename = 'TreeWithListItems.perf.tsx'

export default TreeWithListItemsPerf
