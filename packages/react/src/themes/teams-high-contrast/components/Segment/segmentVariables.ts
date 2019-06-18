import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables'

export default (siteVars: any): Partial<SegmentVariables> => ({
  colorDisabled: siteVars.colors.black,
  backgroundColorDisabled: siteVars.accessibleGreen,
})
