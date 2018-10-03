import * as React from 'react'
import Popup from '../Popup/Popup'
import Icon from '../Icon'
import Divider from '../Divider'
import ContextualMenu from '../ContextualMenu'

export class PopupWithSubmenu extends React.Component<any, any> {
  state = { popupOpen: false }
  togglePopupState = () => {
    this.setState(prev => ({ popupOpen: !prev.popupOpen }))
  }
  render = () => {
    const { item, callback } = this.props
    return (
      <span>
        <Popup
          open={this.state.popupOpen}
          onOpenChange={(e, newProps) => {
            this.setState({ popupOpen: newProps.open })
          }}
          align="top"
          position="after"
          trigger={
            <div onClick={() => this.togglePopupState()}>
              {item.iconName ? (
                <Icon name={item.iconName} styles={{ paddingLeft: '0', paddingRight: '15px' }} />
              ) : null}
              <span style={{ paddingLeft: '15px' }}>{item.title}</span>
              <Icon name="arrow right" styles={{ float: 'right', marginRight: '15px' }} />
            </div>
          }
          content={<ContextualMenu menutree={item.submenuitems} callback={callback} />}
        />
        {item.divider ? <Divider variables={{ dividerPadding: 0 }} /> : null}
      </span>
    )
  }
}
