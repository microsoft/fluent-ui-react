import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables'
import { Partial } from 'types/utils'

export default (siteVariables: any): Partial<SegmentVariables> => {
  return {
    background: siteVariables.black,
    border: '1px solid ' + siteVariables.white,
  }
}
