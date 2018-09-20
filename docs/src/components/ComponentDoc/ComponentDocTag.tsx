import * as React from 'react'
import * as _ from 'lodash'
import { Header } from '@stardust-ui/react'
import { Message } from 'semantic-ui-react'

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

    return (
      <div>
        <Header
          as="h3"
          styles={{ root: { whiteSpace: 'pre-line' } }}
          className="no-anchor"
          content={title}
        />
        {defaultAccBehaviorInfo && (
          <div>{this.renderDefaultBehaviorInfo(defaultAccBehaviorInfo)}</div>
        )}

        <div>{description}</div>

        {!defaultAccBehaviorInfo &&
          !description && (
            <div>
              <Message error content={errorMessage} compact={true} />
            </div>
          )}
      </div>
    )
  }
}

export default ComponentDocTag
