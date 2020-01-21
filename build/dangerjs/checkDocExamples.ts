import { DangerJS } from './types'
import { componentInfoContext, getMissingExamples } from '../../docs/src/utils'

export default async ({ danger, fail, warn }: DangerJS) => {
  componentInfoContext.parents.forEach(info => {
    getMissingExamples(info.displayName).forEach(({ prop }) => {
      warn(`Missing ${info.displayName} example for ${prop.name}`)
    })
  })
}
