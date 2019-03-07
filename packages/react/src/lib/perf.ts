import * as _ from 'lodash'
import isBrowser from './isBrowser'

enum STYLE_BATCHING_STRATEGY {
  // This is the default for fela's current implementation
  // It does not batch, but calls insertRule for every property/value pair in the style object as they are processed
  PER_PROPERTY = 'PER_PROPERTY',

  // This means insert rules once AFTER [fela] renderRule is done.
  // This would be equivalent to writing styles to the head after the style object for each component "slot" is processed.
  PER_SLOT = 'PER_SLOT',

  // This means insert rules once AFTER getClasses() is done.
  // This would be equivalent to writing styles to the head after the style object for an entire component (all slots) is processed.
  PER_COMPONENT = 'PER_COMPONENT',

  // This means insert rules once AFTER the application root has mounted.
  // This is more of an experiment and baseline comparison.
  ENTIRE_TREE = 'ENTIRE_TREE',
}

// These are different ways to get processed style rules into the actual DOM node and CSSOM.  It does not concern batching.
enum STYLE_NODE_UPDATE_STRATEGY {
  // Don't update the DOM or CSSOM
  SKIP = 'SKIP',

  // Call native browser CSSStyleSheet.insertRule() function (fela default when !renderer.devMode)
  INSERT_RULE = 'INSERT_RULE',

  // Crazy idea to use @media all { ... } to write multiple rules at once.
  // The browser's insertRule only supports writing one rule at a time. If any batching is done, a hack like this would have to be used.
  INSERT_RULE_MEDIA_QUERY_ALL = 'INSERT_RULE_MEDIA_QUERY_ALL',

  // Another hack to enable batching, expected to be far less performant.
  // Replace the actual style tag's textContent and let the browser apply the style change.
  TEXT_CONTENT = 'TEXT_CONTENT',
}

type PERF_FLAGS = {
  /**
   * Stop all calls into fela methods.
   * Isolates timings to React and Stardust.
   */
  SKIP_FELA: boolean

  /**
   * Skips context providers/consumers.
   */
  SKIP_CONTEXT: boolean

  /**
   * Simulate dev/production mode (enable rule textContent vs insertion replace).
   */
  FELA_RENDERER_DEV_MODE: boolean

  /**
   * Skip wrapping components in FocusZone.
   * Removes FocusZone timings.
   */
  SKIP_FOCUS_ZONE: boolean

  /**
   * Skip processing with Fela plugins.
   * Removes processStyleWithPlugins timings.
   */
  SKIP_FELA_PLUGINS: boolean

  /**
   * TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
   * Different strategies for batching
   */
  STYLE_BATCHING_STRATEGY: STYLE_BATCHING_STRATEGY

  /**
   * TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
   * Different strategies for updating the DOM/CSSOM _after_ class names and styles are computed.
   */
  STYLE_NODE_UPDATE_STRATEGY: STYLE_NODE_UPDATE_STRATEGY

  /**
   * @see http://fela.js.org/docs/recipes/MonolithicClassNames.html
   */
  USE_FELA_MONOLITHIC: boolean
}

const DEFAULT_FLAGS_PROD: PERF_FLAGS = {
  FELA_RENDERER_DEV_MODE: false,
  SKIP_CONTEXT: false,
  SKIP_FELA: false,
  SKIP_FOCUS_ZONE: false,
  SKIP_FELA_PLUGINS: false,
  STYLE_NODE_UPDATE_STRATEGY: STYLE_NODE_UPDATE_STRATEGY.INSERT_RULE,
  STYLE_BATCHING_STRATEGY: STYLE_BATCHING_STRATEGY.PER_PROPERTY,
  USE_FELA_MONOLITHIC: false,
}

const DEFAULT_FLAGS_DEV: PERF_FLAGS = {
  FELA_RENDERER_DEV_MODE: true,
  SKIP_CONTEXT: false,
  SKIP_FELA: false,
  SKIP_FOCUS_ZONE: false,
  SKIP_FELA_PLUGINS: false,
  STYLE_NODE_UPDATE_STRATEGY: STYLE_NODE_UPDATE_STRATEGY.INSERT_RULE,
  STYLE_BATCHING_STRATEGY: STYLE_BATCHING_STRATEGY.PER_PROPERTY,
  USE_FELA_MONOLITHIC: false,
}

const b = isBrowser()
//////////////////////////////////////////////////////
// god help us....
const perfWindow: any = b
  ? window
  : {
      localStorage: { setItem: () => null, getItem: () => null },
      performance: { mark: () => null, measure: () => null },
    }
//////////////////////////////////////////////////////

const initialFlags: PERF_FLAGS =
  JSON.parse(perfWindow.localStorage.getItem('flags')) || DEFAULT_FLAGS_DEV

const makeFlags = json => {
  const proxy = new Proxy(json, {
    set(target: PERF_FLAGS, p: PropertyKey, value: any, receiver: any): boolean {
      const ret = Reflect.set(target, p, value, receiver)
      perfWindow.localStorage.setItem('flags', JSON.stringify(target, null, 2))
      location.reload()
      return ret
    },
  })
  perfWindow.localStorage.setItem('flags', JSON.stringify(proxy, null, 2))
  return proxy
}

export const flags = makeFlags(initialFlags)

perfWindow.flags = flags
perfWindow.dev = () => {
  perfWindow.flags = makeFlags(DEFAULT_FLAGS_DEV)
  location.reload()
}
perfWindow.prod = () => {
  perfWindow.flags = makeFlags(DEFAULT_FLAGS_PROD)
  location.reload()
}
perfWindow.prodNoFela = () => {
  perfWindow.flags = makeFlags({ ...DEFAULT_FLAGS_PROD, SKIP_FELA: true })
  location.reload()
}

export const timeStart = function timeStart(id) {
  const uniqueId = _.uniqueId()
  const markStart = `${id}-start${uniqueId}`
  const markEnd = markStart.replace('-start', '-end')

  perfWindow.performance.mark(markStart)

  return function timeEnd() {
    perfWindow.performance.mark(markEnd)
    perfWindow.performance.measure(id + uniqueId, markStart, markEnd)
  }
}

export const time = function time(id, fn) {
  let call = 0
  return function (...args) {
    call++
    const timeEnd = timeStart(id + call)
    const res = fn(...args)
    timeEnd()
    return res
  }
}

export const printTimings = () => {
  const entryList = performance.getEntriesByType('measure')
  const [reactEntries, ourEntries] = _.partition(entryList, entry => entry.name.startsWith('⚛ '))

  const reactEntriesById = _.groupBy(
    reactEntries.filter(({ name }) => name.includes('[mount]')),
    group => group.name.replace(/\d/g, ''),
  )
  const ourEntriesById = _.groupBy(ourEntries, group => group.name.replace(/\d/g, ''))

  const summedReactEntriesObject = _.mapValues(reactEntriesById, vals =>
    _.sum(_.map(vals, 'duration')),
  )
  const summedOurEntriesObject = _.mapValues(ourEntriesById, vals => _.sum(_.map(vals, 'duration')))

  const sortedReactObject = _.fromPairs(
    _.sortBy(_.toPairs(summedReactEntriesObject), pair => -pair[1]),
  )
  const sortedOurObject = _.fromPairs(_.sortBy(_.toPairs(summedOurEntriesObject), pair => -pair[1]))

  console.table(flags)
  console.table(sortedOurObject)
  console.table(sortedReactObject)
  console.table(_.fromPairs(_.sortBy(_.toPairs(perfWindow.componentCount), pair => -pair[1])))
}
