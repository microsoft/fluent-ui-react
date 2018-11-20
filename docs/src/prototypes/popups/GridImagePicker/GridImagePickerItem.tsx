import { Image, Button } from '@stardust-ui/react'

import * as React from 'react'
import * as _ from 'lodash'

export interface GridPickerItemProps {
  as?: keyof React.ReactHTML
  title?: string
  imageSrc: string
  onClick?: (e: React.SyntheticEvent, props: GridPickerItemProps) => void
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

class GridImagePickerItem extends React.Component<GridPickerItemProps> {
  static defaultProps = {
    as: 'li',
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  render() {
    const { title, imageSrc, as: ElementType } = this.props

    return (
      <ElementType>
        <Button styles={imageButtonStyles} onClick={this.handleClick} title={title} role="listitem">
          {imageSrc && <Image styles={imageStyles} src={imageSrc} fluid />}
        </Button>
      </ElementType>
    )
  }
}

export default GridImagePickerItem
