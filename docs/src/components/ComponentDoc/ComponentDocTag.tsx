import * as React from 'react'
import * as _ from 'lodash'
import { Header, Message } from 'semantic-ui-react'
const behaviorMenuItems = require('docs/src/behaviorMenu')

const headerStyle = {
  whiteSpace: 'pre-line',
}

type defaultBehavior = {
  type: string
  displayName: string
  defaultFile: string
}
type defaultBehaviorInfo = {
  name: string
  url: string
}

class ComponentDocTag extends React.Component<any, any> {
  getTagDescription = (forTag, fromInfo) => {
    const tags = (fromInfo.docblock && fromInfo.docblock.tags) || []
    return _.result(_.find(tags, 'title', forTag), 'description')
  }

  getDefaultBehaviorInfo = (fromInfo): defaultBehaviorInfo => {
    let defaultBehavior: defaultBehavior
    const accProperty = fromInfo.props.find(property => property.name === 'accessibility')
    if (!accProperty) {
      return undefined
    }

    const accPropertyFormatted = accProperty.defaultValue.split('.').pop() + '.ts'

    behaviorMenuItems.forEach(behavior => {
      behavior.variations.find(variation => {
        if (variation.name === accPropertyFormatted) {
          defaultBehavior = {
            type: behavior.type,
            displayName: behavior.displayName,
            defaultFile: variation.name,
          }
        }
      })
    })

    if (defaultBehavior) {
      const behaviorsFolder = defaultBehavior.type + 's'
      const defaultBehaviorFile = defaultBehavior.defaultFile.replace('.ts', '')
      const defaultBehaviorInfo: defaultBehaviorInfo = {
        name: `${defaultBehaviorFile}`,
        url: `${behaviorsFolder}/${defaultBehavior.displayName}#${_.kebabCase(
          defaultBehaviorFile,
        )}`,
      }
      return defaultBehaviorInfo
    }

    return undefined
  }

  getDefaultBehavior(info) {
    const defaultBehaviorInfo: defaultBehaviorInfo = this.getDefaultBehaviorInfo(info)
    if (defaultBehaviorInfo) {
      return (
        <Header.Subheader>
          <span>
            Default behavior: <a href={defaultBehaviorInfo.url}> {defaultBehaviorInfo.name} </a>
          </span>
        </Header.Subheader>
      )
    }
  }

  render() {
    const { info, tag, title, errorMessage } = this.props
    const accDescription = this.getTagDescription(tag, info)
    const description =
      accDescription || this.getDefaultBehaviorInfo(info) ? (
        accDescription
      ) : (
        <Message error content={errorMessage} compact={true} />
      )

    return (
      <Header as="h2" style={headerStyle} className="no-anchor">
        <Header.Content>{title}</Header.Content>
        {this.getDefaultBehavior(info)}
        <Header.Subheader> {description} </Header.Subheader>
      </Header>
    )
  }
}

export default ComponentDocTag
