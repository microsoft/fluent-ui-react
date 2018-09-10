import * as React from 'react'
import * as _ from 'lodash'
import { Header, Message } from 'semantic-ui-react'
const behaviorMenuItems = require('docs/src/behaviorMenu')

const headerStyle = {
  whiteSpace: 'pre-line',
}

interface DefaultBehaviorInfo {
  name: string
  url: string
}

class ComponentDocTag extends React.Component<any, any> {
  getTagDescription = (forTag, fromInfo) => {
    const tags = (fromInfo.docblock && fromInfo.docblock.tags) || []
    return _.result(_.find(tags, 'title', forTag), 'description')
  }

  findDefaultBehaviorInfo = (componentInfo): DefaultBehaviorInfo => {
    const accessibilityDescription = componentInfo.props.find(
      property => property.name === 'accessibility',
    )
    if (!accessibilityDescription) {
      return undefined
    }

    const defaultAccBehaviorFilename =
      accessibilityDescription.defaultValue.split('.').pop() + '.ts'

    for (const behavior of behaviorMenuItems) {
      const variation = behavior.variations.find(v => v.name === defaultAccBehaviorFilename)
      if (variation) {
        return this.createDefaultBehaviorInfo(behavior, variation)
      }
    }

    return undefined
  }

  createDefaultBehaviorInfo(behavior: any, variation: any): DefaultBehaviorInfo {
    const behaviorsFolder = behavior.type + 's'
    const defaultBehaviorFile = variation.name.replace('.ts', '')
    return {
      name: `${defaultBehaviorFile}`,
      url: `${behaviorsFolder}/${behavior.displayName}#${_.kebabCase(defaultBehaviorFile)}`,
    }
  }

  renderDefaultBehavior(info) {
    const defaultBehaviorInfo: DefaultBehaviorInfo = this.findDefaultBehaviorInfo(info)
    if (defaultBehaviorInfo) {
      return (
        <Header.Subheader>
          <span>
            Default behavior: <a href={defaultBehaviorInfo.url}> {defaultBehaviorInfo.name} </a>
          </span>
        </Header.Subheader>
      )
    }

    return undefined
  }

  render() {
    const { info, tag, title, errorMessage } = this.props
    const accDescription = this.getTagDescription(tag, info)
    const description =
      accDescription || this.findDefaultBehaviorInfo(info) ? (
        accDescription
      ) : (
        <Message error content={errorMessage} compact={true} />
      )

    return (
      <Header as="h2" style={headerStyle} className="no-anchor">
        <Header.Content>{title}</Header.Content>
        {this.renderDefaultBehavior(info)}
        <Header.Subheader> {description} </Header.Subheader>
      </Header>
    )
  }
}

export default ComponentDocTag
