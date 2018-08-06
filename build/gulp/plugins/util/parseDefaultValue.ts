import * as _ from 'lodash'

export default propDef => _.get(propDef, 'defaultValue.value', undefined)
