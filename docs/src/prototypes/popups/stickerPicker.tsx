import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  Button,
  Popup,
  Menu,
  dialogBehavior,
  tabBehavior,
  tabListBehavior,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import { arrayOfStickerImagesNames, getItemsData } from './helper'
import GridImagePicker from './GridImagePicker/GridImagePicker'

const tabListItemsContent = [
  'Popular',
  'Office drama',
  'Meme',
  'Designers',
  'Dev',
  'Legal',
  'Team squatch',
]

class StickerPicker extends React.Component {
  state = { activeMenuIndex: 0 }
  gridPickerRef = React.createRef<GridImagePicker>()

  getStickersData = () => {
    const index = arrayOfStickerImagesNames[this.state.activeMenuIndex]
      ? this.state.activeMenuIndex
      : 0
    return getItemsData(arrayOfStickerImagesNames[index], 'sticker of')
  }

  onMenuItemClick = (e, props) => {
    this.setState({ activeMenuIndex: props.index }, () => {
      const gridPickerElement = ReactDOM.findDOMNode(this.gridPickerRef.current) as HTMLElement
      const input = gridPickerElement && gridPickerElement.querySelector('input')
      input && input.focus()
    })
  }

  getTabListItems = () => {
    return _.map(tabListItemsContent, item => ({
      key: item,
      content: item,
      onClick: this.onMenuItemClick,
      accessibility: tabBehavior,
    }))
  }

  render() {
    return (
      <Popup
        accessibility={dialogBehavior}
        position="below"
        trigger={<Button icon="sticky note" aria-label="Choose a sticker." />}
        content={{
          'aria-label': 'Choose a sticker. Press Enter key to insert sticker.',
          content: (
            <div style={{ display: 'flex' }}>
              <div className="left-rail" style={{ paddingRight: '10px' }}>
                <Menu
                  accessibility={tabListBehavior}
                  activeIndex={this.state.activeMenuIndex}
                  items={this.getTabListItems()}
                  vertical
                  pointing
                />
              </div>
              <div className="right-rail">
                <GridImagePicker ref={this.gridPickerRef} items={this.getStickersData()} />
              </div>
            </div>
          ),
        }}
      />
    )
  }
}

export default StickerPicker
