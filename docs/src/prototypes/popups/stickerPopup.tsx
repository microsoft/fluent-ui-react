import React from 'react'
import {
  Button,
  Popup,
  Grid,
  Input,
  Menu,
  tabBehavior,
  tabListBehavior,
  popupFocusTrapBehavior,
  gridBehavior,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import { arrayOfStickerImages, renderImages } from './helper'

import ReactDOM from 'react-dom'

class StickerPopup extends React.Component {
  state = { activeMenuIndex: 0 }

  renderImages = () => {
    const index = arrayOfStickerImages[this.state.activeMenuIndex] ? this.state.activeMenuIndex : 0
    return renderImages(arrayOfStickerImages[index], 'sticker of')
  }

  onMenuItemClick = (e, props) => {
    this.setState({ activeMenuIndex: props.index }, () => {
      const popupElement = ReactDOM.findDOMNode(this) as HTMLElement
      const input = popupElement.querySelector('input')
      input && input.focus()
    })
  }

  items = [
    {
      key: 'popular',
      content: 'Popular',
      onClick: this.onMenuItemClick,
      accessibility: tabBehavior,
    },
    {
      key: 'drama',
      content: 'Office drama',
      onClick: this.onMenuItemClick,
      accessibility: tabBehavior,
    },
    { key: 'meme', content: 'Meme', onClick: this.onMenuItemClick, accessibility: tabBehavior },
    {
      key: 'design',
      content: 'Designers',
      onClick: this.onMenuItemClick,
      accessibility: tabBehavior,
    },
    { key: 'dev', content: 'Dev', onClick: this.onMenuItemClick, accessibility: tabBehavior },
    { key: 'legal', content: 'Legal', onClick: this.onMenuItemClick, accessibility: tabBehavior },
    {
      key: 'squatch',
      content: 'Team squatch',
      onClick: this.onMenuItemClick,
      accessibility: tabBehavior,
    },
  ]

  render() {
    return (
      <Popup
        position="below"
        accessibility={popupFocusTrapBehavior}
        trigger={<Button icon="sticky note" aria-label="Choose a sticker." />}
        content={{
          content: (
            <div
              style={{ display: 'flex' }}
              aria-label="Choose a sticker. Press Enter key to insert sticker."
              role="dialog"
              aria-modal="true"
            >
              <div className="left-rail" style={{ paddingRight: '10px' }}>
                <Menu
                  accessibility={tabListBehavior}
                  activeIndex={this.state.activeMenuIndex}
                  items={this.items}
                  vertical
                  pointing
                />
              </div>
              <div className="right-rail">
                {
                  <Input
                    styles={{ marginBottom: '10px' }}
                    fluid
                    icon="search"
                    placeholder="Search..."
                  />
                }
                {
                  <Grid
                    as="ul"
                    accessibility={gridBehavior}
                    styles={{
                      width: '320px',
                      listStyle: 'none',
                      padding: '0',
                      margin: '0',
                      gridRowGap: '10px',
                    }}
                    columns="5"
                    content={this.renderImages()}
                  />
                }
              </div>
            </div>
          ),
        }}
      />
    )
  }
}

export default StickerPopup
