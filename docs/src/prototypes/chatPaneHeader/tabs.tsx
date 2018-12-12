import * as React from 'react'
import { Layout, Menu, Button, tabListBehavior, tabBehavior, Icon } from '@stardust-ui/react'

const menuStyle = {
  marginLeft: '3rem',
}

const menuItems = [
  { key: 'chat', content: 'Chat', accessibility: tabBehavior },
  { key: 'files', content: 'Files', accessibility: tabBehavior },
  { key: 'wiki ', content: 'Wiki', accessibility: tabBehavior },
]

class Tabs extends React.Component {
  public render() {
    return (
      <Layout
        start={
          <Menu
            accessibility={tabListBehavior}
            styles={menuStyle}
            aria-label="tab list"
            defaultActiveIndex={0}
            items={menuItems}
            underlined
            primary
          />
        }
        main={
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
        }
      />
    )
  }
}

export default Tabs
