import { FontIconSpec } from 'theme'

const fontAwesome = (iconCode: string): FontIconSpec => ({
  fontFamily: 'Icons',
  content: `'\\${iconCode}'`,
})

export default {
  'call-home': fontAwesome('f015'),
  'take-rest': fontAwesome('f0f4'),
} as { [key: string]: FontIconSpec }
