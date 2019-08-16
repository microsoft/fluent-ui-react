import { CodeSnippet } from '@stardust-ui/docs-components'
import * as _ from 'lodash'
import * as React from 'react'
import reactElementToJsxString from 'react-element-to-jsx-string'
import * as faker from 'faker'

import * as stardust from '@stardust-ui/react'
import { Extendable, ObjectOf } from '@stardust-ui/react/src/types'
import { ComponentInfo } from '../../../../build/gulp/plugins/util/getComponentInfo'

const fontAwesomeIcons = {}
// import { fontAwesomeIcons } from '../../../../src/themes/teams/components/Icon/fontAwesomeIconStyles'

const { Provider } = stardust

export type ComponentExplorerProps = {
  info: ComponentInfo
}

export type Example = {
  name: string
  description: string
  props: ObjectOf<any>
}

export type ComponentExplorerState = Extendable<{
  eventLog: any[]
  historyIndex: number
  isPlaying: boolean
  example: Example
  exampleIndex: number
  props: ObjectOf<any>
  userProps: ObjectOf<any>

  previewExample: Example
  previewExampleIndex: number
  previewProps: ObjectOf<any>
}>

const EXCLUDED_PROPS = [
  'accessibility',
  'children',
  'className',
  'input',
  'styles',
  'variables',
  'wrapper',
]

const hasTooltipStyle = {
  display: 'inline-block',
  lineHeight: 1,
  marginBottom: '0.2rem',
  borderBottom: '1px dotted',
  cursor: 'pointer',
}

const EXAMPLES_BY_DISPLAY_NAME = {
  Avatar: [
    {
      name: 'Default',
      description:
        'The name used for displaying the initials of the avatar if the image is not provided.',
      props: { name: 'John Doe' },
    },
    {
      name: 'Image',
      description: 'An avatar can contain an image',
      props: {
        image: { src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of John Doe' },
        status: 'success',
      },
    },
  ],

  Button: [
    {
      name: 'Default',
      description: 'A button indicates a possible user action.',
      props: { content: 'Click here' },
    },
    {
      name: 'Primary',
      description: 'A button can indicate it is the primary action.',
      props: { content: 'Primary', primary: true },
    },
    {
      name: 'Secondary',
      description: 'A button can indicate it is the secondary action.',
      props: { content: 'Secondary', secondary: true },
    },
    {
      name: 'Icon',
      description: 'A button can contain an icon.',
      props: { icon: 'user' },
    },
    {
      name: 'Icon only',
      description: 'A button can be formatted differently if it contains only an icon.',
      props: { icon: 'user', iconOnly: true },
    },
    {
      name: 'Icon with content',
      description: 'A button can contain an icon and content.',
      props: { icon: 'user', content: 'Profile' },
    },
    {
      name: 'Icon position after',
      description: 'A button can place its icon at the after.',
      props: { icon: 'user', content: 'Profile', iconPosition: 'after' },
    },
    {
      name: 'Disabled',
      description: 'A button can show it is currently unable to be interacted with.',
      props: { icon: 'user', content: 'Profile', disabled: 'true' },
    },
  ],
}

const PLAY_DURATION = 3000
const SIDEBAR_SIZE = '12rem'

const getRandomProps = (info: ComponentInfo): ComponentExplorerState['props'] => {
  const props = {}

  // TODO: this doesn't handle enum / <select> props
  // TODO: this doesn't handle shorthand
  info.props.forEach(({ type, name }) => {
    if (info.displayName === 'Image') {
      const width = _.random(10, 320)
      const height = _.random(10, 240)
      // TODO: add src to Image component?
      // TODO: it also doesn't show up in the props editor if we don't...
      props['src'] = faker.image.imageUrl(width, height).replace(/https?:/, '')
    }
    if (info.displayName === 'Input') {
      // TODO: add plaacaeholder and value to Image component?
      // TODO: it also doesn't show up in the props editor if we don't...
      if (_.random() && !props['defaultValue'] && !props['placeholder']) {
        const propName = _.random() ? 'defaultValue' : 'placeholder'
        const propValue = propName === 'placeholder' ? faker.hacker.verb() : faker.company.bs()
        props[propName] = _.capitalize(propValue)
      }
    }
    if (type === 'boolean') {
      props[name] = !!_.random()
      return
    }
    if (name === 'color' && _.random()) {
      props[name] = _.sample([
        'blue',
        'green',
        'grey',
        'orange',
        'pink',
        'purple',
        'teal',
        'red',
        'yellow',
      ])
      return
    }
    if (name === 'content' && _.random()) {
      props[name] = _.capitalize(`${faker.hacker.verb()} ${faker.hacker.noun()}`)
      return
    }
    if (name === 'description' && _.random()) {
      props[name] = faker.company.catchPhrase()
    }
    if (name === 'header' && _.random()) {
      props[name] = faker.company.bs()
    }
    if (name === 'icon' || (info.displayName === 'Icon' && name === 'name')) {
      if (_.random()) {
        props[name] = _.sample(_.keys(fontAwesomeIcons))
      }
    }
    if (name === 'image' && _.random()) {
      props[name] = faker.image.imageUrl().replace(/https?:/, '')
      return
    }
    if (name === 'label' && _.random()) {
      props[name] = faker.company.bs()
      return
    }
    if (name === 'name') {
      if (info.displayName === 'Avatar' && _.random()) {
        props[name] = faker.name.findName()
      }
      return
    }
    if ((name === 'state' || name === 'status') && _.random()) {
      props[name] = _.sample(['info', 'success', 'warning', 'error'])
      return
    }
    if (type === 'string') {
      props[name] = ''
      return
    }
    if (name === 'type') {
      if (info.displayName === 'Input' && _.random(0, 3) === 0) {
        props[name] = _.sample(['text', 'password', 'number', 'date'])
      }
      return
    }
  })

  return props
}

class ComponentExplorer extends React.Component<ComponentExplorerProps, ComponentExplorerState> {
  state = {
    eventLog: [],
    historyIndex: 0,
    isPlaying: false,
    example: EXAMPLES_BY_DISPLAY_NAME[this.props.info.displayName][0],
    exampleIndex: 0,
    props: EXAMPLES_BY_DISPLAY_NAME[this.props.info.displayName][0].props,
    userProps: {},

    previewExample: null,
    previewExampleIndex: null,
    previewProps: {},
  }

  examples: Example[] = EXAMPLES_BY_DISPLAY_NAME[this.props.info.displayName]
  history: ComponentExplorerState['props'][] = []
  isChangingHistory: boolean = false
  playProgressRef: HTMLDivElement
  playProgressTimer: number
  playTimer: number

  componentDidMount() {
    this.recordHistory(this.state)
  }

  componentWillReceiveProps(nextProps) {
    this.setExamples(nextProps.info.displayName)
  }

  componentDidUpdate(prevProps, prevState) {
    const didExampleChange = prevState.exampleIndex !== this.state.exampleIndex
    const didComponentChange = prevProps.info.displayName !== this.props.info.displayName

    this.recordHistory(this.state)

    if (didComponentChange) {
      this.setExamples(this.props.info.displayName)
      this.setExampleByIndex(0)
      this.clearHistory()
    }

    if (didExampleChange) {
      if (this.state.isPlaying) {
        this.playProgressRef.style.transition = ''
        this.playProgressRef.style.transform = 'scaleX(0)'
        clearTimeout(this.playProgressTimer)
        this.playProgressTimer = setTimeout(() => {
          this.playProgressRef.style.transition = `transform ${PLAY_DURATION}ms linear`
          this.playProgressRef.style.transform = 'scaleX(1)'
        })
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.playProgressTimer)
    clearTimeout(this.playTimer)
  }

  clearEventLog = () => {
    this.setState({ eventLog: [] })
  }

  clearHistory = () => {
    this.history = []
    this.setState({ historyIndex: 0 })
  }

  recordHistory = state => {
    if (this.isChangingHistory) return

    const history = state.props

    if (_.isEqual(_.last(this.history), history)) return

    this.history.push(history)

    this.setState({ historyIndex: this.history.length - 1 })
  }

  togglePlay = () => (this.state.isPlaying ? this.stop() : this.play())

  setExamples = (displayName: string) => {
    this.examples = EXAMPLES_BY_DISPLAY_NAME[displayName] || []
  }

  setExampleByIndex = (exampleIndex: number) => {
    const example = this.examples[exampleIndex]
    this.setState({ exampleIndex, example, props: example.props })
  }

  play = () => {
    this.setState({ isPlaying: true })
    this.next()
    this.playTimer = window.setInterval(this.next, PLAY_DURATION)
  }

  next = () => {
    this.setState(prevState => {
      const exampleIndex = (prevState.exampleIndex + 1) % this.examples.length
      const example = this.examples[exampleIndex]
      return { exampleIndex, example, props: example.props }
    })
  }

  prev = () => {
    this.setState(prevState => {
      const exampleIndex = (prevState.exampleIndex + 1) % this.examples.length
      const example = this.examples[exampleIndex]
      return { exampleIndex, example }
    })
  }

  stop = () => {
    window.clearInterval(this.playTimer)
    this.setState({ isPlaying: false })
  }

  resetProps = () => {
    this.stop()
    this.setState({ userProps: {} })
  }

  randomizeProps = () => {
    const { info } = this.props
    const { props } = this.state

    this.stop()

    let randomProps = props
    while (_.isEmpty(randomProps) || _.isEqual(randomProps, props)) {
      randomProps = getRandomProps(info)
    }

    this.setState(prevState => ({ props: randomProps }))
  }

  handleBooleanChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.stop()

    this.setState(prevState => {
      delete prevState.previewProps[name]

      return {
        previewProps: prevState.previewProps,
        userProps: { ...prevState.userProps, [name]: !prevState.userProps[name] },
      }
    })
  }

  handleBooleanMouseEnter = (name: string) => (e: React.MouseEvent<HTMLLabelElement>) => {
    this.setState(prevState => {
      const isActive = prevState.props[name] || prevState.userProps[name]
      if (isActive) return prevState

      return { previewProps: { ...prevState.previewProps, [name]: true } }
    })
  }

  handleBooleanMouseLeave = (name: string) => (e: React.MouseEvent<HTMLLabelElement>) => {
    this.setState(prevState => {
      delete prevState.previewProps[name]
      return prevState
    })
  }

  handleExampleClick = (exampleIndex: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    this.stop()

    const example = this.examples[exampleIndex]

    this.setState({
      exampleIndex,
      example,
      props: example.props,
      previewExampleIndex: undefined,
      previewExample: undefined,
    })
  }

  handleExampleMouseEnter = (exampleIndex: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState(prevState => {
      if (exampleIndex === prevState.exampleIndex) return undefined

      const example: Example = this.examples[exampleIndex]
      return { previewExampleIndex: exampleIndex, previewExample: example }
    })
  }

  handleExampleMouseLeave = (exampleIndex: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState(prevState => {
      return { previewExampleIndex: undefined, previewExample: undefined }
    })
  }

  handleHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const historyIndex = Number(e.target.value)
    const props = this.history[historyIndex]

    this.isChangingHistory = true
    this.setState({ historyIndex, props }, () => {
      this.isChangingHistory = false
    })
  }

  handleStringChange = (name: string) => (e: React.ChangeEvent<any>) => {
    this.stop()

    const value = e.target.value
    this.setState(prevState => {
      if (value === '') {
        delete prevState.userProps[name]
        return prevState
      }

      return { userProps: { ...prevState.userProps, [name]: value } }
    })
  }

  handleSelectChange = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.stop()

    const { value } = e.target
    const stateValue = value === 'true' ? true : !value ? undefined : value

    this.setState(prevState => {
      if (stateValue === undefined) {
        delete prevState.userProps[name]
        return prevState
      }

      return { userProps: { ...prevState.userProps, [name]: stateValue } }
    })
  }

  render() {
    const { info } = this.props
    const {
      eventLog,
      example,
      exampleIndex,
      // historyIndex,
      isPlaying,
      previewProps,
      previewExample,
      previewExampleIndex,
      props,
      userProps,
    } = this.state
    const activeProps = { ...props, ...userProps }
    const activePropsWithPreviews = {
      ...activeProps,
      ...previewProps,
      ...(previewExample && previewExample.props),
    }

    // props

    const filteredProps = info.props.filter(prop => {
      return !_.includes(EXCLUDED_PROPS, prop.name)
    })

    const animationProp = filteredProps.find(({ name }) => {
      return name === 'animation'
    })

    const asProp = filteredProps.find(({ name }) => {
      return name === 'as'
    })

    const booleanProps = filteredProps.filter(({ type }) => {
      return type === 'boolean'
    })

    const callbackProps = filteredProps.filter(({ name, type }) => {
      return /^on[A-Z]\w+$/.test(name)
    })

    const stringProps = filteredProps.filter(({ type, name }) => {
      return type === 'string' || type === 'ShorthandValue' || name === 'content'
    })

    const unsupportedProps = _.without(
      filteredProps,
      animationProp,
      asProp,
      ...booleanProps,
      ...stringProps,
      ...callbackProps,
    )

    // element

    const element = React.createElement(_.get(stardust, info.apiPath), {
      ...activePropsWithPreviews,
      ...callbackProps.reduce((acc, next) => {
        acc[next.name] = (...args) => {
          const event = { name: next.name, date: new Date(), args: args.map(arg => typeof arg) }
          this.setState(prevState => ({ eventLog: [event, ...prevState.eventLog].slice(0, 5) }))
          console.log(`${event.name}(`, ...args, ')')
        }
        return acc
      }, {}),
    })

    // stringified element

    const jsxString = reactElementToJsxString(element, {
      filterProps: [...EXCLUDED_PROPS, ...callbackProps.map(({ name }) => name)],
      functionValue: fn => fn.name,
      showFunctions: true,
    })

    const htmlString = '<button></button>' // ReactDOMServer.renderToStaticMarkup(element)

    return (
      <div id="explorer" style={{ margin: 'auto auto 50rem auto' }}>
        <ul style={{ fontSize: '1.5rem', margin: 0, padding: 0, listStyle: 'none' }}>
          <li
            style={{
              display: 'inline-block',
              padding: '1rem 0',
              marginRight: '2rem',
              fontWeight: 600,
            }}
          >
            Explorer
          </li>
          <li
            style={{
              display: 'inline-block',
              padding: '1rem 0',
              marginRight: '2rem',
              opacity: 0.5,
            }}
          >
            Examples
          </li>
          <li
            style={{
              display: 'inline-block',
              padding: '1rem 0',
              marginRight: '2rem',
              opacity: 0.5,
            }}
          >
            Accessibility
          </li>
          <li
            style={{
              display: 'inline-block',
              padding: '1rem 0',
              marginRight: '2rem',
              opacity: 0.5,
            }}
          >
            Props
          </li>
        </ul>
        <div>
          {/*
            TOP ROW
          */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `${SIDEBAR_SIZE} auto ${SIDEBAR_SIZE}`,
              fontSize: '1.2rem',
            }}
          >
            <div style={{ padding: '1rem', fontWeight: 'bold' }}>Examples</div>
            <div style={{ padding: '1rem' }}>
              <strong>{(previewExample || example).name}</strong>
              <br />
              <span>{(previewExample || example).description}</span>
            </div>
            <ul style={{ margin: 0, padding: '1rem', listStyle: 'none' }}>
              <li style={{ display: 'inline', marginRight: '1rem', fontWeight: 'bold' }}>Props</li>
              <li style={{ display: 'inline', marginRight: '1rem' }}>Theme</li>
            </ul>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: `${SIDEBAR_SIZE} auto ${SIDEBAR_SIZE}` }}
          >
            {/*
              CONTAINER - EXAMPLE LIST
            */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* EXAMPLES LIST */}
              <div style={{ flex: 1, padding: '0 1rem' }}>
                {this.examples.map(({ name, description }, i) => (
                  <div
                    onMouseEnter={this.handleExampleMouseEnter(i)}
                    onMouseLeave={this.handleExampleMouseLeave(i)}
                    key={name}
                    title={name}
                    style={{
                      transition: 'border 0.2s, background 0.2s',
                      cursor: 'pointer',
                      padding: '0.25rem 1rem',
                      color: i === previewExampleIndex ? 'rgba(0, 0, 0, 0.5)' : '',
                      borderLeftWidth: '2px',
                      borderLeftStyle: 'solid',
                      borderLeftColor:
                        i === exampleIndex
                          ? '#000'
                          : i === previewExampleIndex
                          ? 'rgba(0, 0, 0, 0.5)'
                          : 'transparent',
                      background:
                        i === exampleIndex
                          ? 'rgba(0, 0, 0, 0.06)'
                          : i === previewExampleIndex
                          ? 'rgba(0, 0, 0, 0.03)'
                          : 'transparent',
                    }}
                    onClick={this.handleExampleClick(i)}
                  >
                    <div style={{ fontWeight: i === exampleIndex ? 'bold' : 'normal' }}>{name}</div>
                  </div>
                ))}
              </div>

              {/* PLAY BUTTON */}
              <div style={{ padding: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  {/* PROGRESS BAR */}
                  {isPlaying && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        margin: '0 2px',
                        transformOrigin: 'left center',
                        height: '1px',
                        background: '#000',
                        boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)',
                      }}
                      ref={c => (this.playProgressRef = c)}
                    />
                  )}

                  <button style={{ width: '100%' }} onClick={this.togglePlay}>
                    {isPlaying ? '❙❙' : '►'}
                  </button>
                </div>
              </div>
            </div>

            {/*
              CONTAINER - RENDERED ELEMENT
            */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* RENDERED ELEMENT s */}
              <Provider.Consumer
                render={theme => (
                  <div
                    dir={theme.rtl ? 'rtl' : undefined}
                    style={{
                      position: 'relative',
                      flex: 1,
                      color: theme.siteVariables.bodyColor,
                      backgroundColor: theme.siteVariables.bodyBackground,
                    }}
                  >
                    <div style={{ padding: '2rem' }}>{element}</div>

                    {/*
                      EVENT LOG
                    */}
                    {!_.isEmpty(eventLog) && (
                      <div
                        style={{
                          position: 'absolute',
                          display: 'flex',
                          flexDirection: 'column',
                          flex: '0 0 auto',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          padding: '1rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flex: '0 0 auto',
                          }}
                        >
                          <span>Event Log</span>
                          <span>
                            <span role="img" aria-label="light">
                              💡
                            </span>{' '}
                            See browser console for full output
                          </span>
                          <button onClick={this.clearEventLog}>
                            <span role="img" aria-label="close">
                              ✖
                            </span>{' '}
                            Clear
                          </button>
                        </div>

                        <pre
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            flex: 1,
                            overflowY: 'auto',
                            fontSize: '12px',
                          }}
                        >
                          {eventLog.map(({ name, date, args }) => (
                            <>
                              <div key="date" style={{ marginRight: '0.5rem', opacity: 0.5 }}>
                                [{_.padStart(date.getHours(), 2, '0')}:
                                {_.padStart(date.getMinutes(), 2, '0')}:
                                {_.padStart(date.getMilliseconds(), 3, '0')}]
                              </div>
                              <div key="name">
                                {name}(<span style={{ opacity: 0.75 }}>{args.join(', ')}</span>)
                              </div>
                            </>
                          ))}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              />

              {/*
               HISTORY
              <div
                style={{
                  display: 'flex',
                  flex: '0 0 auto',
                  padding: '0.25rem 0 0.25rem 0.5rem',
                  width: '100%',
                  color: 'rgba(0, 0, 0, 0.5)',
                  background: '#eee',
                }}
              >
                <input
                  style={{ flex: '1' }}
                  type="range"
                  min={0}
                  max={this.history.length - 1}
                  value={historyIndex}
                  onChange={this.handleHistoryChange}
                />
                <div style={{ flex: '0 0 auto', paddingLeft: '0.5rem', fontFamily: 'monospace' }}>
                  history {historyIndex}/{this.history.length - 1}
                </div>
              </div>
              */}
            </div>

            {/*
              CONTAINER - PROP KNOBS
            */}
            <div style={{ alignSelf: 'stretch', padding: '0 1rem', flex: '0 0 auto' }}>
              {/* CHECKBOXES */}
              {booleanProps.map(prop => (
                <div key={prop.name}>
                  <label
                    onMouseEnter={this.handleBooleanMouseEnter(prop.name)}
                    onMouseLeave={this.handleBooleanMouseLeave(prop.name)}
                  >
                    <input
                      type="checkbox"
                      value={prop.name}
                      name={prop.name}
                      checked={!!activeProps[prop.name]}
                      onChange={this.handleBooleanChange(prop.name)}
                    />{' '}
                    <span style={hasTooltipStyle} title={prop.description}>
                      {prop.name}
                    </span>
                    {previewProps[prop.name] && (
                      <em style={{ float: 'right', opacity: 0.75 }}>
                        <small>preview</small>
                      </em>
                    )}
                    {userProps[prop.name] && (
                      <div style={{ float: 'right', color: 'darkgoldenrod' }}>
                        <small>override</small>
                      </div>
                    )}
                  </label>
                </div>
              ))}

              {/* INPUTS */}
              {stringProps.map(prop => (
                <div key={prop.name}>
                  <label>
                    <strong style={hasTooltipStyle} title={prop.description}>
                      {prop.name}
                    </strong>
                    <input
                      style={{ width: '100%' }}
                      name={prop.name}
                      value={activeProps[prop.name] || ''}
                      onInput={this.handleStringChange(prop.name)}
                    />
                  </label>
                </div>
              ))}

              {/* AS */}
              {asProp && (
                <div>
                  <label>
                    <strong style={hasTooltipStyle} title={asProp.description}>
                      {asProp.name}
                    </strong>
                    <input
                      style={{ width: '100%' }}
                      name={asProp.name}
                      value={activeProps[asProp.name] || ''}
                      onChange={this.handleStringChange(asProp.name)}
                    />
                  </label>
                </div>
              )}

              {/* ANIMATION */}
              {animationProp && (
                <Provider.Consumer
                  render={theme => (
                    <div>
                      <label>
                        <strong style={hasTooltipStyle} title={asProp.description}>
                          {animationProp.name}
                        </strong>
                        <select
                          style={{ width: '100%' }}
                          name={animationProp.name}
                          value={activeProps[animationProp.name] || ''}
                          onChange={this.handleSelectChange(animationProp.name)}
                        >
                          <option value={undefined} />
                          {_.keys(theme.animations).map(animationName => (
                            <option key={animationName} value={animationName}>
                              {animationName}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  )}
                />
              )}

              {/* CALLBACKS */}
              {!_.isEmpty(callbackProps) && (
                <div>
                  <strong
                    style={hasTooltipStyle}
                    title="Interact with the component to see event logs"
                  >
                    Callbacks:
                  </strong>
                  <br />
                  {callbackProps.map(prop => prop.name).join(', ')}
                  <br />
                  <small>
                    <span role="img" aria-label="light">
                      💡
                    </span>{' '}
                    See browser console for events
                  </small>
                </div>
              )}

              {/* UNSUPPORTED */}
              {!_.isEmpty(unsupportedProps) && (
                <small style={{ color: 'darkred' }}>
                  <strong>UNSUPPORTED PROPS</strong>
                  <br />
                  {unsupportedProps.map(({ name }) => name).join(', ')}
                </small>
              )}

              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <button style={{ marginTop: '0.5rem' }} onClick={this.randomizeProps}>
                  ∞ random
                </button>
                <button
                  style={{ marginTop: '0.5rem' }}
                  onClick={this.resetProps}
                  disabled={_.isEqual(activeProps, example.props)}
                >
                  ✕ reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          {/*
            CODE SNIPPETS
          */}
          <div style={{ flex: 1 }}>
            <CodeSnippet fitted mode="jsx" value={jsxString} />
            <CodeSnippet fitted label="Rendered HTML" mode="html" value={htmlString} />
          </div>
        </div>
        {/* <h3>callbackProps</h3> */}
        {/* <pre>{JSON.stringify(callbackProps, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(info, null, 2)}</pre> */}
      </div>
    )
  }
}

export default ComponentExplorer
