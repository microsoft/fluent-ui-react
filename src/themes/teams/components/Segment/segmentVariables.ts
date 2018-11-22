import { ComponentVariablesPrepared } from '@stardust-ui/react'

export interface SegmentVariables {
  padding: string
  background: string
  borderRadius: string
  color: string
}

const segmentVariables: ComponentVariablesPrepared = siteVariables => ({
  padding: '1em',
  background: siteVariables.bodyBackground,
  borderRadius: 0,
  color: undefined,
})

export default segmentVariables
