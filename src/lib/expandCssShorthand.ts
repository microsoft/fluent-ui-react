import * as expand from 'css-shorthand-expand'
import * as _ from 'lodash'

const expandCssShorthand = styles => {
  if (!styles) {
    return styles
  }
  const result = {}
  console.log(expand)
  Object.keys(styles).forEach(key => {
    if (_.includes(shorthands, key)) {
      const expandedProps = expand(_.kebabCase(key), String(styles[key]))
      Object.keys(expandedProps).forEach(key => {
        result[_.camelCase(key)] = expandedProps[key]
      })
    } else {
      result[key] = styles[key]
    }
  })
  return result
}

const shorthands = [
  'font',
  'padding',
  'margin',
  'border',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderRadius',
  'background',
  'outline',
]

export default expandCssShorthand
