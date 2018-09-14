const _ = require('lodash')

const evalValue = value => eval(value) // tslint:disable-line no-eval

const isTransformable = value => typeof value === 'string' && value.includes('names')

const uniqValues = values => _.uniqWith(values, (val, other) => `${val}` === `${other}`)

const transformEnumValues = values =>
  _.flatMap(values, ({ value }) => {
    if (value === 'names') return evalValue(value)
    return value.replace(/'/g, '')
  })

const parseEnum = type => {
  const { value } = type

  if (isTransformable(value)) return { ...type, value: uniqValues(evalValue(value)) }
  return { ...type, value: uniqValues(transformEnumValues(value)) }
}

const parseUnion = union => {
  const { value } = union
  const values = _.flatten(_.map(_.filter(value, { name: 'enum' }), type => parseEnum(type).value))

  return {
    ...union,
    name: _.map(value, 'name').join('|'),
    value: values,
  }
}

const parsers = {
  enum: parseEnum,
  union: parseUnion,
}

export default (propName, { type }) => {
  if (type === undefined) {
    throw new Error(
      [
        `The prop "${propName}" does not contain propType definition. This happens if the property is in the `,
        'defaultProps, but it is not in the propTypes',
      ].join(' '),
    )
  }

  const parser = parsers[type.name]

  return parser ? parser(type) : type
}
