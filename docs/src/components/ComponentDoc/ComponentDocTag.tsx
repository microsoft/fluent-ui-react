import * as React from 'react'
import * as _ from 'lodash'
import { Header, Message } from 'semantic-ui-react'
const behaviorMenuItems = require('docs/src/componentMenuBehaviors')

const headerStyle = {
  whiteSpace: 'pre-line',
}

class ComponentDocTag extends React.Component<any, any> {
  getTagDescription = (forTag, fromInfo) => {
    const tags = (fromInfo.docblock && fromInfo.docblock.tags) || []
    return _.result(_.find(tags, 'title', forTag), 'description')
  }

  getBehaviorURLandName = fromInfo => {
    const defaultBeharior = {
      name: undefined,
      url: undefined,
    }
    const accProperty = fromInfo.props.find(property => property.name === 'accessibility')
    if (!accProperty) {
      return defaultBeharior
    }
    const accPropertyFormatted = accProperty.defaultValue.split('.').pop() + '.ts'
    // const behaviorFiltered = behaviorMenuItems.filter(behavior => behavior.variations.find(variation => variation.name.includes(accPropertyFormatted)))
    //   .map(behavior => ({
    //     type: behavior.type,
    //     displayName: behavior.displayName,
    //     defaultFile: behavior.variations.find(variation => variation.name.includes(accPropertyFormatted)).name,
    //   }))

    const behaviorFiltered = []
    behaviorMenuItems.forEach(behavior => {
      return behavior.variations.find(variation => {
        if (variation.name === accPropertyFormatted) {
          behaviorFiltered.push({
            type: behavior.type,
            displayName: behavior.displayName,
            defaultFile: variation.name,
          })
        }
      })
    })

    if (behaviorFiltered && behaviorFiltered.length > 0) {
      const behaviorsFolder = behaviorFiltered[0].type + 's'
      const behaviorFile = behaviorFiltered[0].defaultFile.replace('.ts', '')
      return {
        name: `${behaviorFile}`,
        url: `${behaviorsFolder}/${behaviorFiltered[0].displayName}#${_.kebabCase(behaviorFile)}`,
      }
    }
    return defaultBeharior
  }

  getDefaultBehavior(info) {
    const defaultBehavior = this.getBehaviorURLandName(info)
    if (defaultBehavior && defaultBehavior.name && defaultBehavior.url) {
      return (
        <span>
          {' '}
          Default behavior: <a href={defaultBehavior.url}> {defaultBehavior.name} </a>{' '}
        </span>
      )
    }
  }

  render() {
    const { info, tag, title, errorMessage } = this.props
    const accDescription = this.getTagDescription(tag, info)
    const description =
      accDescription || this.getBehaviorURLandName(info).name ? (
        accDescription
      ) : (
        <Message error content={errorMessage} compact={true} />
      )

    return (
      <Header as="h2" style={headerStyle} className="no-anchor">
        <Header.Content>{title}</Header.Content>
        <Header.Subheader> {this.getDefaultBehavior(info)} </Header.Subheader>
        <Header.Subheader> {description} </Header.Subheader>
      </Header>
    )
  }
}

export default ComponentDocTag
