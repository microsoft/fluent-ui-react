import { ThemeInput } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

const C = () => {
  const theme = React.useContext<ThemeInput>(ThemeContext)

  return <div>{(!!theme.rtl).toString()}</div>
}

const ContextUsePerf = () => (
  <>
    {_.times(10000, key => (
      <C key={key} />
    ))}
  </>
)

export default ContextUsePerf
