import React from 'react'
import { Button, Popup, Grid, Image, Input, Menu, List, ListItem } from '@stardust-ui/react'
import * as _ from 'lodash'
import ReactDOM from 'react-dom'

const imageStyle = {
  width: '100%',
}

const imageButtonStyles = {
  minWidth: '56px',
  height: '56px',
  padding: '0',
  background: '#fff',
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

  handleSelection(e) {
    if (!e.target) return
    const img = e.target.nodeName !== 'IMG' ? e.target.querySelector('img') : e.target
    const selectedItem = img && img.getAttribute('aria-label')
    if (!selectedItem) return
    alert(`The image was selected "${selectedItem}"`)
  }

  renderImages = () => {
    const index = arrayOfImages[this.state.activeMenuIndex] ? this.state.activeMenuIndex : 0
    return _.map(arrayOfImages[index], image => (
      <li key={image.key}>
        <Button styles={imageButtonStyles} onClick={this.handleSelection}>
          <Image
            styles={imageStyle}
            alt={`image of ${image.key}`}
            aria-label={`image of ${image.key}`}
            fluid
            src={image.src ? image.src : `public/images/avatar/large/${image.key}.jpg`}
          />
        </Button>
      </li>
    ))
  }

  onMenuItemClick = (e, props) => {
    this.setState({ activeMenuIndex: props.index }, () => {
      const popupElement = ReactDOM.findDOMNode(this) as HTMLElement
      const input = popupElement.querySelector('input')
      input && input.focus()
    })
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
              {
                <Grid
                  as="ul"
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
        }
      />
    )
  }
}

export default StickerPopup
