import * as React from 'react'
import * as _ from 'lodash'
import Popup from '../Popup/Popup'
import ContextMenu from '../ContextMenu'
import List, { ListItem } from '../List'

export class PopupWithSubmenu extends React.Component<any, any> {
  state = { popupOpen: false }
  togglePopupState = () => {
    this.setState(prev => ({ popupOpen: !prev.popupOpen }))
  }
  render = () => {
    const { item, items, onItemClick } = this.props
    const itemProps = _.pick(this.props, List.itemProps)
    itemProps.onClick = this.togglePopupState
    item.selection = true
    return (
      <Popup
        open={this.state.popupOpen}
        align="top"
        position="after"
        trigger={ListItem.create(item, { defaultProps: itemProps })}
        content={<ContextMenu items={items} onItemClick={onItemClick} />}
      />
    )
  }
}
