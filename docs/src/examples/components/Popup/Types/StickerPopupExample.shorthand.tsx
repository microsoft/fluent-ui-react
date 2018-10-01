import React from 'react'
import { Button, Popup, Grid, Image, Input, Menu } from '@stardust-ui/react'
import * as _ from 'lodash'

const imageStyle = {
  padding: '5px',
}

const arrayOfImages = [
  [
    {
      key: 'ade',
    },
    {
      key: 'chris',
    },
    {
      key: 'christian',
    },
    {
      key: 'daniel',
    },
    {
      key: 'elliot',
    },
    {
      key: 'elyse',
      src: 'public/images/avatar/large/elyse.png',
    },
    {
      key: 'helen',
    },
    {
      key: 'jenny',
    },
    {
      key: 'joe',
    },
    {
      key: 'justen',
    },
    {
      key: 'kristy',
      src: 'public/images/avatar/large/kristy.png',
    },
    {
      key: 'laura',
    },
    {
      key: 'matt',
    },
    {
      key: 'molly',
      src: 'public/images/avatar/large/molly.png',
    },
    {
      key: 'matthew',
      src: 'public/images/avatar/large/matthew.png',
    },
    {
      key: 'nan',
    },
    {
      key: 'patrick',
      src: 'public/images/avatar/large/patrick.png',
    },
    {
      key: 'nom',
    },
    {
      key: 'rachel',
      src: 'public/images/avatar/large/rachel.png',
    },
    {
      key: 'stevie',
    },
    {
      key: 'steve',
    },
    {
      key: 'tom',
    },
    {
      key: 'veronika',
    },
  ],
  [
    {
      key: 'stevie',
    },
    {
      key: 'steve',
    },
    {
      key: 'tom',
    },
    {
      key: 'veronika',
    },
  ],
  [
    {
      key: 'molly',
      src: 'public/images/avatar/large/molly.png',
    },
    {
      key: 'matthew',
      src: 'public/images/avatar/large/matthew.png',
    },
    {
      key: 'nan',
    },
    {
      key: 'patrick',
      src: 'public/images/avatar/large/patrick.png',
    },
    {
      key: 'nom',
    },
  ],
  [
    {
      key: 'jenny',
    },
    {
      key: 'joe',
    },
    {
      key: 'justen',
    },
    {
      key: 'kristy',
      src: 'public/images/avatar/large/kristy.png',
    },
  ],
  [
    {
      key: 'chris',
    },
    {
      key: 'christian',
    },
    {
      key: 'daniel',
    },
    {
      key: 'elliot',
    },
    {
      key: 'elyse',
      src: 'public/images/avatar/large/elyse.png',
    },
    {
      key: 'helen',
    },
    {
      key: 'jenny',
    },
    {
      key: 'joe',
    },
    {
      key: 'justen',
    },
    {
      key: 'kristy',
      src: 'public/images/avatar/large/kristy.png',
    },
    {
      key: 'laura',
    },
    {
      key: 'matt',
    },
    {
      key: 'molly',
      src: 'public/images/avatar/large/molly.png',
    },
    {
      key: 'matthew',
      src: 'public/images/avatar/large/matthew.png',
    },
  ],
]

class StickerPopup extends React.Component {
  state = { activeMenuIndex: 0 }

  renderImages = () => {
    const index = arrayOfImages[this.state.activeMenuIndex] ? this.state.activeMenuIndex : 0
    return _.map(arrayOfImages[index], image => (
      <Image
        data-is-focusable="true"
        styles={imageStyle}
        key={image.key}
        aria-label={`image of ${image.key}`}
        fluid
        src={image.src ? image.src : `public/images/avatar/large/${image.key}.jpg`}
      />
    ))
  }

  onMenuItemClick = (e, props) => {
    this.setState({ activeMenuIndex: props.index })
  }

  items = [
    { key: 'popular', content: 'Popular', onClick: this.onMenuItemClick },
    { key: 'drama', content: 'Office drama', onClick: this.onMenuItemClick },
    { key: 'meme', content: 'Meme', onClick: this.onMenuItemClick },
    { key: 'design', content: 'Designers', onClick: this.onMenuItemClick },
    { key: 'dev', content: 'Dev', onClick: this.onMenuItemClick },
    { key: 'legal', content: 'Legal', onClick: this.onMenuItemClick },
    { key: 'squatch', content: 'Team squatch', onClick: this.onMenuItemClick },
  ]

  render() {
    return (
      <Popup
        position="below"
        trigger={<Button icon="sticky note" />}
        content={
          <div style={{ display: 'flex' }}>
            <div className="left-rail" style={{ paddingRight: '10px' }}>
              <Menu activeIndex={this.state.activeMenuIndex} items={this.items} vertical pointing />
            </div>
            <div className="right-rail">
              {
                <Input
                  styles={{ marginBottom: '5px' }}
                  fluid
                  icon="search"
                  placeholder="Search..."
                />
              }
              {<br />}
              {<Grid styles={{ width: '300px' }} columns="5" content={this.renderImages()} />}
            </div>
          </div>
        }
      />
    )
  }
}

export default StickerPopup
