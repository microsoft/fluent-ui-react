import { StaticStyles } from '../../../../types/theme'
import globalStyles from './globalStyles'
import normalizeCSS from './normalizeCSS'

const staticStyles: StaticStyles = [normalizeCSS, globalStyles]

export default staticStyles
