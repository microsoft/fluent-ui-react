import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

class C extends React.Component {
  static contextType = ThemeContext

  render() {
    return <div>{(!!this.context.rtl).toString()}</div>
  }
}

const ContextClassField = () => (
  <>
    {_.times(10000, key => (
      <C key={key} />
    ))}
  </>
)

export default ContextClassField
