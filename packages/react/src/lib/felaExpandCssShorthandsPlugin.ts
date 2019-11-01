import * as _ from 'lodash'
import expand from './cssExpandShorthand'
import * as _memoize from 'fast-memoize'

// `fast-memoize` is a CJS library, there are known issues with them:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const memoize = (_memoize as any).default || _memoize

// _.camelCase is quite fast, but we are running it for the same values many times
// https://jsperf.com/js-camelcase/25
const camelCase = memoize(_.camelCase)

const handledCssPropsMap = {
  font: 'font',
  padding: 'padding',
  margin: 'margin',
  border: 'border',
  borderWidth: 'border-width',
  borderStyle: 'border-style',
  borderColor: 'border-color',
  borderTop: 'border-top',
  borderRight: 'border-right',
  borderBottom: 'border-bottom',
  borderLeft: 'border-left',
  borderRadius: 'border-radius',
  background: 'background',
  outline: 'outline',

  // SHORTHAND PROPERTIES NOT SUPPORTED:
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#See_also
  //
  // animation: 'animation',
  // columnRule: 'column-rule',
  // columns: 'columns',
  // flex: 'flex',
  // flexFlow: 'flex-flow',
  // grid: 'grid',
  // gridArea: 'grid-area',
  // gridColumn: 'grid-column',
  // gridRow: 'grid-row',
  // gridTemplate: 'grid-template',
  // listStyle: 'list-style',
  // offset: 'offset',
  // overflow: 'overflow',
  // placeContent: 'place-content',
  // placeItems: 'place-items',
  // placeSelf: 'place-self',
  // textDecoration: 'text-decoration',
  // transition: 'transition',
}

export default () => {
  const expandCssShorthands = (styles: Object) => {
    return Object.keys(styles).reduce((acc, cssPropertyName) => {
      const cssPropertyValue = styles[cssPropertyName]

      if (typeof cssPropertyValue === 'object') {
        return { ...acc, [cssPropertyName]: expandCssShorthands(cssPropertyValue) }
      }

      if (handledCssPropsMap[cssPropertyName]) {
        const expandedProps = expand(handledCssPropsMap[cssPropertyName], `${cssPropertyValue}`)
        if (expandedProps) {
          return { ...acc, ...convertKeysToCamelCase(expandedProps) }
        }
      }

      return { ...acc, [cssPropertyName]: cssPropertyValue }
    }, {})
  }

  return expandCssShorthands
}

const convertKeysToCamelCase = obj => _.mapKeys(obj, (value, key) => camelCase(key))
