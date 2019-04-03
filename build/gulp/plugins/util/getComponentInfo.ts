import * as _ from 'lodash'
import * as path from 'path'
import * as fs from 'fs'
import parseDefaultValue from './parseDefaultValue'
import parseDocblock from './parseDocblock'
import parseType from './parseType'
import * as docgen from './docgen'

interface BehaviorInfo {
  name: string
  displayName: string
  category: string
}

const getComponentInfo = (filepath: string) => {
  const absPath = path.resolve(process.cwd(), filepath)

  const dir = path.dirname(absPath)
  const dirname = path.basename(dir)
  const filename = path.basename(absPath)
  const filenameWithoutExt = path.basename(absPath, path.extname(absPath))

  // singular form of the component's ../../ directory
  // "element" for "src/elements/Button/Button.js"
  const componentType = path.basename(path.dirname(dir)).replace(/s$/, '')

  const components = docgen.withDefaultConfig().parse(absPath)

  if (!components.length) {
    throw new Error(`Could not find a component definition in "${filepath}".`)
  }
  if (components.length > 1) {
    throw new Error(
      [
        `Found more than one component definition in "${filepath}".`,
        'This is currently not supported, please ensure your module only defines a single React component.',
      ].join(' '),
    )
  }
  const info: any = components[0]

  // add exported Component info
  //
  // this 'require' instruction might break by producing partially initialized types - because of ts-node module's cache used during processing
  // - in that case we might consider to disable ts-node cache when running this command: https://github.com/ReactiveX/rxjs/commit/2f86b9ddccbf020b2e695dd8fe0b79194efa3f56
  const Component = require(absPath).default
  info.constructorName = _.get(Component, 'prototype.constructor.name', null)

  // add component type
  info.type = componentType

  // add parent/child info
  info.isParent = filenameWithoutExt === dirname
  info.isChild = !info.isParent
  info.parentDisplayName = info.isParent ? null : dirname
  // "Field" for "FormField" since it is accessed as "Form.Field" in the API
  info.subcomponentName = info.isParent
    ? null
    : info.displayName.replace(info.parentDisplayName, '')

  // "ListItem.js" is a subcomponent is the "List" directory
  const subcomponentRegExp = new RegExp(`^${dirname}\\w+\\.tsx$`)

  info.subcomponents = info.isParent
    ? fs
        .readdirSync(dir)
        .filter(file => subcomponentRegExp.test(file))
        .map(file => path.basename(file, path.extname(file)))
    : null

  // where this component should be exported in the api
  info.apiPath = info.isChild
    ? `${info.parentDisplayName}.${info.subcomponentName}`
    : info.displayName

  // class name for the component
  // example, the "button" in class="ui-button"
  // name of the component, sub component, or plural parent for sub component groups
  info.componentClassName = (info.isChild
    ? _.includes(info.subcomponentName, 'Group')
      ? `ui-${info.parentDisplayName}s`
      : `ui-${info.parentDisplayName}__${info.subcomponentName}`
    : `ui-${info.displayName}`
  ).toLowerCase()

  // replace the component.description string with a parsed docblock object
  info.docblock = parseDocblock(info.description)
  delete info.description

  // file and path info
  info.repoPath = absPath
    .replace(`${process.cwd()}${path.sep}`, '')
    .replace(new RegExp(_.escapeRegExp(path.sep), 'g'), '/')
  info.filename = filename
  info.filenameWithoutExt = filenameWithoutExt

  // replace prop `description` strings with a parsed docblock object and updated `type`
  _.each(info.props, (propDef, propName) => {
    const { description, tags } = parseDocblock(propDef.description)
    const { name, value } = parseType(propName, propDef)

    info.props[propName] = {
      ...propDef,
      description,
      tags,
      value,
      defaultValue: parseDefaultValue(propDef),
      name: propName,
      type: name,
    }
  })

  // sort props
  info.props = _.sortBy(info.props, 'name')

  // available behaviors
  info.behaviors = getAvailableBehaviors(_.find(info.props, { name: 'accessibility' }))
  return info
}

const getAvailableBehaviors: (accessibilityProp: any) => BehaviorInfo = accessibilityProp => {
  const docTags = accessibilityProp && accessibilityProp.tags
  const availableTag = _.find(docTags, { title: 'available' })
  const availableBehaviorNames = _.get(availableTag, 'description', '')

  if (!availableBehaviorNames) {
    return undefined
  }

  return availableBehaviorNames
    .replace(/\s/g, '')
    .split(',')
    .map(name => ({
      name,
      displayName: _.upperFirst(name.replace('Behavior', '')),
      category: _.upperFirst(name.split(/(?=[A-Z])/)[0]),
    }))
}

export default getComponentInfo
