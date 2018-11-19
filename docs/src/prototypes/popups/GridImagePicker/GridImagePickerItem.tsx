import * as React from 'react'

import { Image, Button } from '@stardust-ui/react'

import _ from 'lodash'

export interface GridItemProps {
  as?: keyof React.ReactHTML
  title?: string
  imageSrc: string
}

class GridImageItemPicker extends React.Component<GridItemProps, any> {
  imageStyle = {
    width: '100%',
  }

  imageButtonStyles = {
    minWidth: '56px',
    height: '56px',
    padding: '0',
    background: '#fff',
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  render() {
    const { title, imageSrc } = this.props
    const Tag = this.props.as || 'li'

    return (
      <Tag>
        <Button styles={this.imageButtonStyles} onClick={this.handleClick} title={title}>
          {imageSrc && <Image styles={this.imageStyle} src={imageSrc} fluid />}
        </Button>
      </Tag>
    )
  }
}

export default GridImageItemPicker
