import * as React from 'react'
import { Image, Menu } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

// const L = <List selectable defaultSelectedIndex={0} items={items} />
const ListExampleSelectable = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  const ref = React.createRef<HTMLElement>()

  const items = [
    {
      key: 'irving',
      media: <Image src="public/images/avatar/small/matt.jpg" avatar />,
      header: 'Irving Kuhic',
      headerMedia: '7:26:56 AM',
      content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
      onClick: e => {
        e.preventDefault()
        setOpen(!open)
      },
      ref,
      'aria-expanded': open,
      role: 'listitem',
    },
    {
      key: 'skyler',
      media: <Image src="public/images/avatar/small/steve.jpg" avatar />,
      header: 'Skyler Parks',
      headerMedia: '11:30:17 PM',
      content: 'Use the online FTP application to input the multi-byte application!',
      role: 'listitem',
    },
    {
      key: 'dante',
      media: <Image src="public/images/avatar/small/nom.jpg" avatar />,
      header: 'Dante Schneider',
      headerMedia: '5:22:40 PM',
      content: 'The GB pixel is down, navigate the virtual interface!',
      role: 'listitem',
    },
  ]

  return (
    <Menu
      vertical
      items={open ? items : [items[0]]}
      onKeyDown={e => {
        if (e.keyCode === 27) {
          setOpen(false)

          // get ref and select first item
        }
      }}
      role="list"
    />
  )
}

export default ListExampleSelectable
