import * as React from 'react'
import * as _ from 'lodash'

import { Grid, Input, gridBehavior } from '@stardust-ui/react'
import GridImagePickerItem, { GridPickerItemProps } from './GridImagePickerItem'

export interface GridPickerProps {
  as?: keyof React.ReactHTML
  items: GridPickerItemProps[]
  gridColumns?: string | number
}

const gridStyles = {
  width: '320px',
  listStyle: 'none',
  padding: '0',
  margin: '0',
  gridRowGap: '10px',
}

const inputStyles = {
  marginBottom: '10px',
}

class GridImagePicker extends React.Component<GridPickerProps, any> {
  static defaultProps = {
    as: 'ul',
  }

  render() {
    return (
      <>
        <Input styles={inputStyles} fluid icon="search" placeholder="Search..." />
        <Grid
          as={this.props.as}
          accessibility={gridBehavior}
          columns={this.props.gridColumns}
          style={gridStyles}
          content={this.renderGridItems()}
        />
      </>
    )
  }

  renderGridItems() {
    return _.map(this.props.items, item => (
      <GridImagePickerItem imageSrc={item.imageSrc} title={item.title} />
    ))
  }
}

export default GridImagePicker
