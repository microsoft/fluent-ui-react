import * as React from 'react'
import { Menu, Segment, Text, Flex as Layout, Icon } from '@stardust-ui/react'

const LayoutExampleStockCard = () => {
  const icon = <Icon size="large" name="ellipsis vertical" />
  const header = [
    <Text key="title" content="Acme Corporation" />,
    <Text key="description" content="NYSE: AZHC • Oct 16, 1:32 PM" />,
  ]
  const largeText = <Text styles={{ fontSize: '4rem', fontWeight: 100 }} content="887.32" />
  const smallText = <Text styles={{ fontWeight: 100 }} content="887.02 (.03%)" />
  const menu = <Menu primary underlined items={['DAY', 'WEEK', 'MONTH']} />

  return (
    <div>
      <Segment style={{ width: 400 }}>
        <Layout fluid vertical gap="32px">
          <Layout between>
            {header}
            {icon}
          </Layout>

          <Layout bottom between>
            {largeText}
            {smallText}
          </Layout>

          {menu}
        </Layout>
      </Segment>
    </div>
  )
}

export default LayoutExampleStockCard
