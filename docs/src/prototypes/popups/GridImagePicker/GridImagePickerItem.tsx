import * as React from 'react'
import { Image, Button } from '@stardust-ui/react'
import * as _ from 'lodash'

export interface GridPickerItemProps {
  as?: keyof React.ReactHTML
  title?: string
  imageSrc: string
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

class GridImageItemPicker extends React.Component<GridPickerItemProps, any> {
  static defaultProps = {
    as: 'li',
  }

  handleClick = e => {
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

export default GridImageItemPicker
