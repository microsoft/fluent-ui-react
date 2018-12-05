import * as Color from 'color'
import { ColorVariants } from '../themes/types'

export const setColorLightness = (base: string, value: number) =>
  Color(base)
    .hsl()
    .lightness(100 - value)
    .hex()

export const createColorVariants = (base: string): ColorVariants => ({
  50: setColorLightness(base, 5),
  100: setColorLightness(base, 10),
  200: setColorLightness(base, 20),
  300: setColorLightness(base, 30),
  400: setColorLightness(base, 40),
  500: base,
  600: setColorLightness(base, 60),
  700: setColorLightness(base, 70),
  800: setColorLightness(base, 80),
  900: setColorLightness(base, 90),
})
