import { StaticStyles } from '../../types'
import globalStyles from './globalStyles'
import normalizeCSS from './normalizeCSS'

const staticStyles: StaticStyles = [normalizeCSS, globalStyles]

export default staticStyles
