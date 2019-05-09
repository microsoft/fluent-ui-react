import * as React from 'react'
import { Table, ItemLayout, Image } from '@stardust-ui/react'
import avatar from './avatar'

const itemLayout = (
  <ItemLayout
    media={<Image src="public/images/avatar/small/nom.jpg" avatar />}
    header="Dante Schneider"
    headerMedia="5:22:40 PM"
    content="The GB pixel is down, navigate the virtual interface!"
  />
)

const header = {
  items: [{ content: 'id' }, { content: 'Name' }, { content: 'Picture' }, { content: 'Action' }],
}

const rows = [
  {
    items: [
      { content: '1' },
      {
        content: 'Roman',
      },
      { content: avatar },
      { content: itemLayout },
    ],
    headerIndex: 2,
  },
  {
    items: [{ content: '2' }, { content: 'Alex' }, { content: avatar }, { content: 'Some text' }],
    headerIndex: 2,
  },
  {
    items: [{ content: '3' }, { content: 'Ali' }, { content: avatar }, { content: 'Some text' }],
    headerIndex: 2,
  },
]

const StaticTable = () => <Table header={header} rows={rows} />

export default StaticTable
