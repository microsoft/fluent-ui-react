import { useSelectKnob, useStringKnob } from '@stardust-ui/docs-components'
import { Header } from '@stardust-ui/react'
import * as React from 'react'

const HeaderPlayground: React.FunctionComponent = () => {
  const [as] = useSelectKnob({
    displayName: <code>as</code>,
    name: 'as',
    initialValue: 'h1',
    values: ['h1', 'h2', 'h3', 'h4', 'h5'],
  })
  const [content] = useStringKnob({
    displayName: <code>content</code>,
    name: 'content',
    initialValue: 'A sample header',
  })

  return <Header as={as} content={content} />
}

export default HeaderPlayground
