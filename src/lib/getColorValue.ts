import { ColorPalette, ComponentColors } from '@stardust-ui/react'

const getColorValue = (colors: ColorPalette, color: ComponentColors) => colors[color] || color

export default getColorValue
