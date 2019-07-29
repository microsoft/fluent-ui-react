import { default as DebugDataProvider } from './debugDataProvider'

export * from './types'

import { default as debugApi } from './debugApi'

// expose debug API as $stardust object
;

(window as any).$stardust = debugApi

export default DebugDataProvider
