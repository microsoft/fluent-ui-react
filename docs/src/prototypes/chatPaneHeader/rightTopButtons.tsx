import * as React from 'react'
import { Button, Icon, Menu, Popup, popupFocusTrapBehavior } from '@stardust-ui/react'

const menuStyles = ({ theme: { siteVariables } }) => ({
  background: siteVariables.white,
  boxShadow: '0 0.2rem 1.6rem 0 rgba(37,36,35,.3)',
  borderRadius: '.3rem',
  marginTop: '5px',
})

const moreOptionsItems = [
  {
    key: 'unpin',
    icon: <Icon name="bullets" />,
    content: 'Unpin',
  },
  {
    key: 'mute',
    icon: <Icon name="bullets" />,
    content: 'Mute',
  },
  {
    key: 'hide',
    icon: <Icon name="bullets" />,
    content: 'Hide',
  },
  {
    key: 'nameGroupChat',
    icon: <Icon name="bullets" />,
    content: 'Name group chat',
  },
  {
    onClick: e => window.alert('leave chat popup will be here'),
    key: 'leaveChat',
    content: 'Leave chat',
    icon: <Icon name="leave" />,
  },
]

class RightTopButtons extends React.Component {
  public render() {
    return (
      <div style={{ flexGrow: 0.2 }}>
        <Button
          onClick={e => window.alert('add people dialog will apear here')}
          aria-haspopup="dialog"
          aria-label="add people"
          circular
          key="userPlus"
          title="add people"
          icon={
            <Icon
              key="userPlus"
              name="user plus"
              size="large"
              variables={siteVars => ({ color: siteVars.gray04 })}
            />
          }
        />
        <Popup
          position="below"
          accessibility={popupFocusTrapBehavior}
          trigger={
            <Button
              aria-haspopup="true"
              circular
              key="moreOptions"
              title="more options"
              icon={
                <Icon
                  key="userPlus"
                  name="ellipsis horizontal"
                  size="large"
                  variables={siteVars => ({ color: siteVars.gray04 })}
                />
              }
            />
          }
          content={
            <Menu styles={menuStyles} vertical pills className="actions" items={moreOptionsItems} />
          }
        />
      </div>
    )
  }
}

export default RightTopButtons
