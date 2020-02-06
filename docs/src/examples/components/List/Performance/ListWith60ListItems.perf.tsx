import { List, Image } from '@fluentui/react'
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

const itemData = () =>
  _.times(60, i => ({
    id: `test${i}`,
    key: `key${i}`,
    content: `${contents[i % contents.length]}`,
    media: <Image src={`${avatars[i % avatars.length]}`} avatar />,
    headerMedia: `${headerMedias[i % headerMedias.length]}`,
    header: `${headers[i % headers.length]}`,
  }))

const ListCommonPerf = () => <List items={itemData()} />

ListCommonPerf.iterations = 100
ListCommonPerf.filename = 'ListCommon.perf.tsx'

export default ListCommonPerf
