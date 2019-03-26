import { ThemeInput } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

const C: React.FunctionComponent = () => (
  <ThemeContext.Consumer>
    {(theme: ThemeInput) => <div>{(!!theme.rtl).toString()}</div>}
  </ThemeContext.Consumer>
)

const ContextConsumerPerf = () => (
  <>
    {_.times(10000, key => (
      <C key={key} />
    ))}
  </>
)

export default ContextConsumerPerf
