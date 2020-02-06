import React from 'react'
import { Button, Provider, themes } from '@fluentui/react'

function Page() {
  return (
    <Provider theme={themes.teams}>
      <Button>Welcome to Next.js!</Button>
    </Provider>
  )
}

export default Page
