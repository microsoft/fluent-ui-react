import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<SegmentVariables> => {
  return {
    background: siteVars.bodyBackground,
    // todo: need to affect border
  }
}
