import { Image, Button } from '@stardust-ui/react'

import * as React from 'react'

export interface GridPickerItemProps {
  as?: keyof React.ReactHTML
  title?: string
  imageSrc: string
  onClick?: (e: React.SyntheticEvent, props: GridPickerItemProps) => void
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

  render() {
    const { title, imageSrc, as: ElementType, onClick } = this.props

    return (
      <ElementType>
        <Button styles={imageButtonStyles} onClick={onClick} title={title} role="listitem">
          {imageSrc && <Image src={imageSrc} fluid />}
        </Button>
      </ElementType>
    )
  }
}

export default GridImagePickerItem
