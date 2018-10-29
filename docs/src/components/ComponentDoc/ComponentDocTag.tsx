import * as React from 'react'
import * as _ from 'lodash'
import { Header, Message } from 'semantic-ui-react'
const behaviorMenuItems = require('docs/src/behaviorMenu')

const headerStyle = {
  whiteSpace: 'pre-line',
}

interface AccessibilityBehaviorInfo {
  name: string
  url: string
}

class ComponentDocTag extends React.Component<any, any> {
  getTagDescription = (forTag, fromInfo) => {
    const tags = (fromInfo.docblock && fromInfo.docblock.tags) || []
    return _.result(_.find(tags, 'title', forTag), 'description')
  }

  getDefaultBehaviorInfo = (fromComponentInfo): AccessibilityBehaviorInfo => {
    const accessibilityDescription = fromComponentInfo.props.find(
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

  createDefaultBehaviorInfo(behavior: any, variation: any): AccessibilityBehaviorInfo {
    const behaviorsFolder = behavior.type + 's'
    const defaultBehaviorFile = variation.name.replace('.ts', '')
    return {
      name: `${defaultBehaviorFile}`,
      url: `${behaviorsFolder}/${behavior.displayName}#${_.kebabCase(defaultBehaviorFile)}`,
    }
  }

  renderDefaultBehaviorInfo(defaultBehaviorInfo: AccessibilityBehaviorInfo) {
    return (
      <React.Fragment>
        Default behavior: <a href={defaultBehaviorInfo.url}>{defaultBehaviorInfo.name}</a>
      </React.Fragment>
    )
  }

  render() {
    const { info, tag, title, errorMessage } = this.props
    const description = this.getTagDescription(tag, info)
    const defaultAccBehaviorInfo = tag === 'accessibility' && this.getDefaultBehaviorInfo(info)

    if (!defaultAccBehaviorInfo) {
      return null
    }

    return (
      <Header as="h2" style={headerStyle} className="no-anchor">
        <Header.Content>{title}</Header.Content>

        {defaultAccBehaviorInfo && (
          <Header.Subheader>
            {this.renderDefaultBehaviorInfo(defaultAccBehaviorInfo)}
          </Header.Subheader>
        )}

        <Header.Subheader>{description}</Header.Subheader>

        {!defaultAccBehaviorInfo &&
          !description && (
            <Header.Subheader>
              <Message error content={errorMessage} compact={true} />
            </Header.Subheader>
          )}
      </Header>
    )
  }
}

export default ComponentDocTag
