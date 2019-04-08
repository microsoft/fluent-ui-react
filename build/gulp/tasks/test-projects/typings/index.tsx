import * as Stardust from '@stardust-ui/react'
import * as React from 'react'

const App = () => (
  <Stardust.Provider theme={Stardust.themes.teams}>
    <Stardust.Button content="Click me" />
  </Stardust.Provider>
)

export default App
