import * as _ from 'lodash'

const getColorValue = (variables, color) => {
  const colorVariable = _.camelCase(`color-${color}`)

  return variables[colorVariable] || color
}

export default getColorValue
