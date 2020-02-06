import { Tree, Image, List } from '@fluentui/react'
import * as _ from 'lodash'
import * as React from 'react'

const avatars = [
  'public/images/avatar/small/matt.jpg',
  'public/images/avatar/small/steve.jpg',
  'public/images/avatar/small/nom.jpg',
]
const headers = ['Irving Kuhic', 'Skyler Parks', 'Dante Schneider']
const headerMedias = ['7:26:56 AM', '11:30:17 PM', '5:22:40 PM']
const contents = [
  'Program the sensor to the SAS alarm through the haptic SQL card!',
  'Use the online FTP application to input the multi-byte application!',
  'The GB pixel is down, navigate the virtual interface!',
]

const itemData = id =>
  _.times(20, i => ({
    id: `${id}${i}`,
    key: `key${id}${i}`,
    title: {
      content: `${contents[i % contents.length]}`,
      media: <Image src={`${avatars[i % avatars.length]}`} avatar />,
      headerMedia: `${headerMedias[i % headerMedias.length]}`,
      header: `${headers[i % headers.length]}`,
    },
  }))

const items = [
  {
    id: '1',
    title: 'House Lannister',
    items: itemData('list-1'),
  },
  {
    id: '2',
    title: 'House Targaryen',
    items: itemData('list-2'),
  },

  {
    id: '3',
    title: 'House Stark',
    items: itemData('list-3'),
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

const Tree60WithListItems = () => (
  <Tree items={items} defaultActiveItemIds={['1', '2', '3']} renderItemTitle={titleRenderer} />
)

Tree60WithListItems.iterations = 5000
Tree60WithListItems.filename = 'Tree60WithListItems.perf.tsx'

export default Tree60WithListItems
