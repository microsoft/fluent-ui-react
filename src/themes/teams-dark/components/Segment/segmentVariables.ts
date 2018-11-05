import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables'
import { Partial } from 'types/utils'

export default (siteVariables: any): Partial<SegmentVariables> => {
  return {
    background: siteVariables.bodyBackground,
    border: '1px solid ' + siteVariables.gray06,
  }
}
