import * as _ from 'lodash'

// export default propDef => _.get(propDef, 'defaultValue.value', undefined)
export default (propDef, typeName) =>
  _.get(propDef, 'defaultValue.value', typeName === 'boolean' ? 'false' : 'undefined')
