import * as Stardust from '@fluentui/react'
import * as React from 'react'

const App = () => (
  <Stardust.Provider theme={Stardust.themes.teams}>
    <Stardust.Button accessibility={Stardust.buttonBehavior} content="Click me" />
  </Stardust.Provider>
)

export default App
