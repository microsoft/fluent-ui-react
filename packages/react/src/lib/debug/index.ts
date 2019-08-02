import { default as DebugDataProvider } from './debugDataProvider'

export * from './types'

import debugApi from './debugApi'

// expose debug API as $stardust object
if (typeof window !== 'undefined') {
  ;(window as any).$stardust = debugApi
}

export { isEnabled } from './debugApi'
export default DebugDataProvider
