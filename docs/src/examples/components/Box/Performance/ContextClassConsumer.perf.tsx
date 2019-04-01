import { ThemeInput } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

class C extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(theme: ThemeInput) => <div>{(!!theme.rtl).toString()}</div>}
      </ThemeContext.Consumer>
    )
  }
}

const ContextClassConsumer = () => (
  <>
    {_.times(10000, key => (
      <C key={key} />
    ))}
  </>
)

export default ContextClassConsumer
