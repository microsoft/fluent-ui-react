import * as React from 'react'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  const [log, setLog] = React.useState<string[]>([])
  const writeLog = message => {
    setLog(prevLog => [`${new Date().toLocaleTimeString()}: ${message}`, ...prevLog])
  }

  return (
    <>
      <Toolbar
        items={[
          {
            key: 'more',
            icon: 'more',
            active: menuOpen,
            menu: {
              items: [
                { key: 'play', content: 'Play', icon: 'play' },
                { key: 'pause', content: 'Pause', icon: 'pause' },
                { key: 'divider', kind: 'divider' },
                'Without icon',
              ],
              onItemClick: (e, { content }) => {
                writeLog(`Click - ${content}`)
              },
            },
            menuOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              setMenuOpen(menuOpen)
            },
          },
        ]}
      />
      <br />
      <button onClick={() => setLog([])}>Clear log</button>
      <pre>
        {log.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </pre>
    </>
  )
}

export default ToolbarExampleMenuShorthand
