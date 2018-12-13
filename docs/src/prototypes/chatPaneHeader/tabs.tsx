import * as React from 'react'
import { Menu, Button, tabListBehavior, tabBehavior, Icon } from '@stardust-ui/react'

const menuStyle = {
  marginLeft: '1rem',
}

const menuItems = [
  { key: 'chat', content: 'Chat', accessibility: tabBehavior },
  { key: 'files', content: 'Files', accessibility: tabBehavior },
  { key: 'wiki ', content: 'Wiki', accessibility: tabBehavior },
]

class Tabs extends React.Component {
  public render() {
    return (
      <div style={{ flexGrow: 0.6, display: 'flex' }}>
        <Menu
          accessibility={tabListBehavior}
          styles={menuStyle}
          aria-label="tab list"
          defaultActiveIndex={0}
          items={menuItems}
          underlined
          primary
        />
        <Button
          key="addTab"
          name="addTab"
          title="Add tab"
          icon={
            <Icon
              key=""
              name="add"
              size="large"
              variables={siteVars => ({ color: siteVars.gray04 })}
            />
          }
          iconOnly
          primary
        />
      </div>
    )
  }
}

export default Tabs
