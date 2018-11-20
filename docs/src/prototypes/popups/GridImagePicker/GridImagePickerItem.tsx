import * as React from 'react'
import { Image, Button } from '@stardust-ui/react'
import * as _ from 'lodash'

export interface GridPickerItemProps {
  as?: keyof React.ReactHTML
  title?: string
  imageSrc: string
  onClick?: (e) => void
}

const imageStyles = {
  width: '100%',
}

const imageButtonStyles = {
  minWidth: '56px',
  height: '56px',
  padding: '0',
  background: '#fff',
}

class GridImagePickerItem extends React.Component<GridPickerItemProps, any> {
  static defaultProps = {
    as: 'li',
  }

  handleClick = e => {
    if (e.target) {
      const btn = e.target.nodeName !== 'IMG' ? e.target : e.target.parentElement
      const selectedItem = btn && btn.title
      selectedItem && alert(`Selected item is: ${selectedItem}`)
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }

  render() {
    const { title, imageSrc } = this.props

    return (
      <this.props.as>
        <Button styles={imageButtonStyles} onClick={this.handleClick} title={title} role="listitem">
          {imageSrc && <Image styles={imageStyles} src={imageSrc} fluid />}
        </Button>
      </this.props.as>
    )
  }
}

export default GridImagePickerItem
