import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables'

export default (siteVars: any): Partial<SegmentVariables> => ({
  colorDisabled: siteVars.colors.grey[450],
  backgroundColorDisabled: siteVars.colors.grey[550],
})
