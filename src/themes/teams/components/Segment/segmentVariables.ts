import { pxToRem } from '../../../../lib'
import { ComponentVariablesPrepared } from '@stardust-ui/react'

export interface SegmentVariables {
  padding: string
  color: string
  fontSize: string
  background: string
  borderRadius: string
}

const segmentVariables: ComponentVariablesPrepared = siteVariables => ({
  padding: '1em',
  background: siteVariables.bodyBackground,
  borderRadius: pxToRem(5),
})

export default segmentVariables
