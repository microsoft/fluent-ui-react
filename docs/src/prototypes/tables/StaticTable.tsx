import * as React from 'react'
import { Table, ItemLayout, Image } from '@stardust-ui/react'
import avatar from './avatar'
import { tableCellBehavior } from '@stardust-ui/accessibility'

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
      { content: '1', accessibility: tableCellBehavior },
      {
        content: 'Roman',
        accessibility: tableCellBehavior,
      },
      { content: avatar, accessibility: tableCellBehavior },
      { content: itemLayout, accessibility: tableCellBehavior },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '2', accessibility: tableCellBehavior },
      { content: 'Alex', accessibility: tableCellBehavior },
      { content: avatar, accessibility: tableCellBehavior },
      { content: 'Some text', accessibility: tableCellBehavior },
    ],
    headerIndex: 2,
  },
  {
    items: [
      { content: '3', accessibility: tableCellBehavior },
      { content: 'Ali', accessibility: tableCellBehavior },
      { content: avatar, accessibility: tableCellBehavior },
      { content: 'Some text', accessibility: tableCellBehavior },
    ],
    headerIndex: 2,
  },
]

const StaticTable = () => <Table header={header} rows={rows} aria-label="static" />

export default StaticTable
