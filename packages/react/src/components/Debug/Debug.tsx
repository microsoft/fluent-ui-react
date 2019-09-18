import keyboardKey from 'keyboard-key'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'
import DebugPanel from './DebugPanel'
import { isBrowser } from '../../lib'

//
// react/packages/shared/ReactTypes.js
//
type ReactEventResponder<E, C> = {
  $$typeof: Symbol | number
  displayName: string
  targetEventTypes: null | string[]
  rootEventTypes: null | string[]
  getInitialState: null | ((props: Object) => Object)
  onEvent: null | ((event: E, context: C, props: Object, state: Object) => void)
  onRootEvent: null | ((event: E, context: C, props: Object, state: Object) => void)
  onMount: null | ((context: C, props: Object, state: Object) => void)
  onUnmount: null | ((context: C, props: Object, state: Object) => void)
}

type ReactEventResponderInstance<E, C> = {
  fiber: Object
  props: Object
  responder: ReactEventResponder<E, C>
  rootEventTypes: null | Set<string>
  state: Object
}

//
// react/packages/react-reconciler/src/ReactFiberHooks.js
//
export type HookType =
  | 'useState'
  | 'useReducer'
  | 'useContext'
  | 'useRef'
  | 'useEffect'
  | 'useLayoutEffect'
  | 'useCallback'
  | 'useMemo'
  | 'useImperativeHandle'
  | 'useDebugValue'
  | 'useResponder'

type ReactProviderType<T> = {
  $$typeof: Symbol | number
  _context: ReactContext<T>
}

type ReactContext<T> = {
  $$typeof: Symbol | number
  Consumer: ReactContext<T>
  Provider: ReactProviderType<T>

  _calculateChangedBits: ((a: T, b: T) => number) | null

  _currentValue: T
  _currentValue2: T
  _threadCount: number

  // DEV only
  _currentRenderer?: Object | null
  _currentRenderer2?: Object | null
}

type ContextDependency<T> = {
  context: ReactContext<T>
  observedBits: number
  next: ContextDependency<any> | null
}

// enum WorkTag {
//   FunctionComponent = 0,
//   ClassComponent = 1,
//   IndeterminateComponent = 2, // Before we know whether it is function or class
//   HostRoot = 3, // Root of a host tree. Could be nested inside another node.
//   HostPortal = 4, // A subtree. Could be an entry point to a different renderer.
//   HostComponent = 5,
//   HostText = 6,
//   Fragment = 7,
//   Mode = 8,
//   ContextConsumer = 9,
//   ContextProvider = 10,
//   ForwardRef = 11,
//   Profiler = 12,
//   SuspenseComponent = 13,
//   MemoComponent = 14,
//   SimpleMemoComponent = 15,
//   LazyComponent = 16,
//   IncompleteClassComponent = 17,
//   DehydratedFragment = 18,
//   SuspenseListComponent = 19,
//   FundamentalComponent = 20,
//   ScopeComponent = 21,
// }

type Source = {
  fileName: string
  lineNumber: number
}

type ExpirationTime = number

type Dependencies = {
  expirationTime: ExpirationTime
  firstContext: ContextDependency<any> | null
  responders: Map<ReactEventResponder<any, any>, ReactEventResponderInstance<any, any>> | null
}

//
// react/packages/react-reconciler/src/ReactFiber.js
//

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
type Fiber = {
  // // These first fields are conceptually members of an Instance. This used to
  // // be split into a separate type and intersected with the other Fiber fields,
  // // but until Flow fixes its intersection bugs, we've merged them into a
  // // single type.
  //
  // // An Instance is shared between all versions of a component. We can easily
  // // break this out into a separate object to avoid copying so much to the
  // // alternate versions of the tree. We put this on a single object for now to
  // // minimize the number of objects created during the initial render.
  //
  // // Tag identifying the type of fiber.
  // tag: WorkTag
  //
  // // Unique identifier of this child.
  // key: null | string

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.
  elementType: any

  // The resolved function/class/ associated with this fiber.
  type: any

  // The local state associated with this fiber.
  stateNode: any

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null

  // Singly Linked List Tree Structure.
  child: Fiber | null
  sibling: Fiber | null
  index: number

  // // The ref last used to attach this node.
  // // I'll avoid adding an owner field for prod and model that as functions.
  // ref: React.Ref<any>

  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any // This type will be more specific once we overload the tag.
  memoizedProps: any // The props used to create the output.

  // // A queue of state updates and callbacks.
  // // updateQueue: UpdateQueue<any> | null,

  // The state used to create the output
  memoizedState: any

  // Dependencies (contexts, events) for this fiber, if it has any
  dependencies: Dependencies | null

  // // Bitfield that describes properties about the fiber and its subtree. E.g.
  // // the ConcurrentMode flag indicates whether the subtree should be async-by-
  // // default. When a fiber is created, it inherits the mode of its
  // // parent. Additional flags can be set at creation time, but after that the
  // // value should remain unchanged throughout the fiber's lifetime, particularly
  // // before its child fibers are created.
  // mode: TypeOfMode
  //
  // // Effect
  // effectTag: SideEffectTag
  //
  // // Singly linked list fast path to the next fiber with side-effects.
  // nextEffect: Fiber | null
  //
  // // The first and last fiber with side-effect within this subtree. This allows
  // // us to reuse a slice of the linked list when we reuse the work done within
  // // this fiber.
  // firstEffect: Fiber | null
  // lastEffect: Fiber | null
  //
  // // Represents a time in the future by which this work should be completed.
  // // Does not include work found in its subtree.
  // expirationTime: ExpirationTime
  //
  // // This is used to quickly determine if a subtree has no pending changes.
  // childExpirationTime: ExpirationTime
  //
  // // This is a pooled version of a Fiber. Every fiber that gets updated will
  // // eventually have a pair. There are cases when we can clean up pairs to save
  // // memory if we need to.
  // alternate: Fiber | null
  //
  // // Time spent rendering this Fiber and its descendants for the current update.
  // // This tells us how well the tree makes use of sCU for memoization.
  // // It is reset to 0 each time we render and only updated when we don't bailout.
  // // This field is only set when the enableProfilerTimer flag is enabled.
  // actualDuration?: number
  //
  // // If the Fiber is currently active in the "render" phase,
  // // This marks the time at which the work began.
  // // This field is only set when the enableProfilerTimer flag is enabled.
  // actualStartTime?: number
  //
  // // Duration of the most recent render time for this Fiber.
  // // This value is not updated when we bailout for memoization purposes.
  // // This field is only set when the enableProfilerTimer flag is enabled.
  // selfBaseDuration?: number
  //
  // // Sum of base times for all descendants of this Fiber.
  // // This value bubbles up during the "complete" phase.
  // // This field is only set when the enableProfilerTimer flag is enabled.
  // treeBaseDuration?: number

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number
  _debugSource?: Source | null
  _debugOwner?: Fiber | null
  _debugIsCurrentlyTiming?: boolean
  _debugNeedsRemount?: boolean

  // Used to verify that the order of hooks does not change between renders.
  _debugHookTypes?: HookType[] | null
}

class FiberNavigator {
  __fiber: Fiber

  static domNodeToReactFiber = (elm: HTMLElement): Fiber => {
    for (const k in elm) {
      if (k.startsWith('__reactInternalInstance$')) {
        return elm[k]
      }
    }

    return null
  }

  static fromFiber = fiber => {
    if (!fiber) return null

    const fiberNavigator = new FiberNavigator()

    Object.defineProperty(fiberNavigator, '__fiber', {
      value: fiber,
      enumerable: false,
      writable: false,
      configurable: false,
    })

    return fiberNavigator
  }

  static fromDOMNode = domNode => {
    const fiber = FiberNavigator.domNodeToReactFiber(domNode)

    if (!fiber) return null

    const fiberNavigator = new FiberNavigator()

    Object.defineProperty(fiberNavigator, '__fiber', {
      value: fiber,
      enumerable: false,
      writable: false,
      configurable: false,
    })

    return fiberNavigator
  }

  get name() {
    return this.isClassComponent || this.isFunctionComponent
      ? this.__fiber.type.displayName || this.__fiber.type.name
      : this.isHostComponent
      ? this.__fiber.stateNode.constructor.name
      : null
  }

  get parent(): FiberNavigator {
    return FiberNavigator.fromFiber(this.__fiber.return)
  }

  get owner() {
    return FiberNavigator.fromFiber(this.__fiber._debugOwner)
  }

  get domNode() {
    return this.isHostComponent
      ? this.__fiber.stateNode
      : this.isClassComponent
      ? ReactDOM.findDOMNode(this.__fiber.stateNode)
      : // : this.isFunctionComponent
        //   // TODO: assumes functional component w/useRef
        // ? this.__fiber.memoizedState &&
        //   this.__fiber.memoizedState.memoizedState &&
        //   this.__fiber.memoizedState.memoizedState.current
        null
  }

  get instance() {
    return this.isClassComponent
      ? this.__fiber.stateNode
      : this.isFunctionComponent // TODO: assumes functional component w/useRef
      ? this.__fiber.memoizedState &&
        this.__fiber.memoizedState.memoizedState &&
        this.__fiber.memoizedState.memoizedState.current
      : null
  }

  get reactComponent() {
    return this.isHostComponent ? this.owner.elementType : this.elementType
  }

  get elementType() {
    return this.__fiber.elementType
  }

  usesHook(name) {
    return this.__fiber._debugHookTypes.some(hook => hook === name)
  }

  //
  // Component Types
  //

  get isClassComponent() {
    // React.Component subclasses have this flag
    // https://reactjs.org/docs/implementation-notes.html
    return typeof this.__fiber.type === 'function' && !!this.__fiber.type.prototype.isReactComponent
  }

  get isFunctionComponent() {
    // React.Component subclasses have this flag
    // https://reactjs.org/docs/implementation-notes.html
    return typeof this.__fiber.type === 'function' && !this.__fiber.type.prototype.isReactComponent
  }

  get isHostComponent() {
    // Host components are platform components (i.e. 'div' on web)
    // https://github.com/acdlite/react-fiber-architecture#type-and-key
    return typeof this.__fiber.type === 'string'
  }

  //
  // What this fiber component renders
  //

  get isDOMComponent() {
    return !!this.__fiber.child && FiberNavigator.fromFiber(this.__fiber.child).isHostComponent
  }

  // https://github.com/facebook/react/blob/16.8.6/packages/react-dom/src/test-utils/ReactTestUtils.js#L193
  get isCompositeComponent() {
    return this.isDOMComponent
      ? false
      : !!this.instance && !!this.instance.render && !!this.instance.setState
  }
}

const stylesForNode = (node: HTMLElement) => {
  const styleSheets = Array.from<any>(document.styleSheets)

  return styleSheets

    .filter(styleSheet => styleSheet.ownerNode.dataset && styleSheet.ownerNode.dataset.felaType)

    .reduce((acc, next) => {
      Array.from(next.cssRules).forEach(rule => {
        const nodesForSelector = Array.from(document.querySelectorAll(rule.selectorText))

        const isMatch = nodesForSelector.some(nodeForRule => {
          return node === nodeForRule
        })

        if (isMatch) acc.push(rule.cssText)
      })

      return acc
    }, [])
}

if (isBrowser()) {
  ;(window as any).F = FiberNavigator
}

const INITIAL_STATE = {
  fiberNav: null,
  stardustOwnerFiberNav: null,
  intermediaryFibers: [],
  isSelecting: false,
  stardustDOMNode: null,
  stardustComponent: null,
  stardustInstance: null,
}

type DebugProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document
}

class Debug extends React.Component<DebugProps> {
  selectorRef = React.createRef<HTMLPreElement>()

  state = { ...INITIAL_STATE }

  static defaultProps = {
    mountDocument: isBrowser() ? window.document : null,
  }

  static propTypes = {
    mountDocument: PropTypes.object.isRequired,
  }

  handleKeyDown = e => {
    const code = keyboardKey.getCode(e)

    switch (code) {
      case keyboardKey.Escape: {
        this.setState(INITIAL_STATE)
        break
      }

      case keyboardKey.d: {
        if (e.altKey && e.shiftKey) {
          const isSelecting = !this.state.isSelecting

          this.setState({
            ...(!isSelecting && INITIAL_STATE),
            isSelecting,
          })
        }
        break
      }
    }
  }

  handleStardustDOMNodeClick = e => {
    const { stardustDOMNode, stardustInstance, stardustComponent } = this.state

    console.debug('Clicked stardustDOMNode. Prevent default and stop propagation.', {
      stardustDOMNode,
      stardustInstance,
      stardustComponent,
    })

    e.preventDefault()
    e.stopPropagation()

    this.setState({ isSelecting: false })
  }

  handleMouseMove = e => {
    // console.log('MOUSEMOVE')
    this.debugDOMNode(e.target)
  }

  debugDOMNode = domNode => {
    let stardustDOMNode
    let stardustComponent: React.Component
    let stardustInstance: object
    const intermediaryFibers = []

    if (!domNode) {
      return
    }

    // console.group('debugDOMNode')

    const isFiberDebuggable = (fiber: FiberNavigator) => {
      // console.log('isFiberDebuggable', fiber)
      return !!fiber && !!fiber.instance && !!fiber.instance.stardustDebug
    }

    //
    // Find nearest Stardust owner
    //
    let stardustOwnerFiberNav = FiberNavigator.fromDOMNode(domNode)
    let foundStardustOwner

    while (!foundStardustOwner && stardustOwnerFiberNav) {
      if (isFiberDebuggable(stardustOwnerFiberNav)) {
        foundStardustOwner = true
      } else {
        stardustOwnerFiberNav = stardustOwnerFiberNav.owner
      }
    }

    if (!foundStardustOwner && !stardustOwnerFiberNav) {
      // console.log("Reached top, didn't find Stardust Owner in DOM")
      // console.groupEnd()
      return
    }

    //
    // Find parents up to Stardust owner
    //
    let parentsFiberNav = FiberNavigator.fromDOMNode(domNode)

    while (!stardustDOMNode && parentsFiberNav) {
      // console.group('WHILE')
      // console.debug({ node, parentsFiberNav, SDComponent })

      // compare owner owner to parents owner
      if (parentsFiberNav && stardustOwnerFiberNav.instance === parentsFiberNav.instance) {
        stardustDOMNode = ReactDOM.findDOMNode(parentsFiberNav.instance)
        stardustComponent = stardustOwnerFiberNav.reactComponent
        stardustInstance = stardustOwnerFiberNav.instance

        // console.debug('FOUND', {
        //   intermediaryFibers,
        //   parentsFiberNav,
        //   stardustOwnerFiberNav,
        //   stardustInstance,
        //   stardustDOMNode,
        //   stardustComponent,
        // })
      } else {
        // Track all React components between the original fiber and the eventual Stardust owner.
        // This will enable us to show a selector for choosing DOM nodes and Stardust components
        //   between the selected element at the nearest Stardust owner.
        if (isFiberDebuggable(parentsFiberNav)) {
          intermediaryFibers.push(parentsFiberNav)
        }
        parentsFiberNav = parentsFiberNav.parent

        // console.debug('SEARCHING', {
        //   intermediaryFibers,
        //   parentsFiberNav,
        //   stardustOwnerFiberNav,
        //   stardustDOMNode,
        // })
      }

      // console.groupEnd()
    }

    // console.groupEnd()

    if (
      stardustOwnerFiberNav !== this.state.stardustOwnerFiberNav ||
      parentsFiberNav !== this.state.fiberNav ||
      intermediaryFibers !== this.state.intermediaryFibers ||
      stardustDOMNode !== this.state.stardustDOMNode ||
      stardustComponent !== this.state.stardustComponent ||
      stardustInstance !== this.state.stardustInstance
    ) {
      this.setState({
        stardustOwnerFiberNav,
        fiberNav: parentsFiberNav,
        intermediaryFibers,
        stardustDOMNode,
        stardustComponent,
        stardustInstance,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.debug('DEBUG componentDidUpdate', { state: this.state, prevState })
    this.setDebugSelectorPosition()
  }

  setDebugSelectorPosition = () => {
    const { stardustDOMNode } = this.state

    if (stardustDOMNode && this.selectorRef.current) {
      const rect = stardustDOMNode.getBoundingClientRect()

      this.selectorRef.current.style.top = `${rect.top}px`
      this.selectorRef.current.style.left = `${rect.left}px`
      this.selectorRef.current.style.width = `${rect.width}px`
      this.selectorRef.current.style.height = `${rect.height}px`

      requestAnimationFrame(this.setDebugSelectorPosition)
    }
  }

  render() {
    const { mountDocument } = this.props
    const {
      // fiberNav,
      // stardustOwnerFiberNav,
      // intermediaryFibers,
      stardustComponent,
      stardustInstance,
      stardustDOMNode,
      isSelecting,
    } = this.state

    const componentName = stardustComponent
      ? stardustComponent.displayName || stardustComponent.name
      : ''

    return (
      <>
        <EventListener
          targetRef={toRefObject(mountDocument.body)}
          listener={this.handleKeyDown}
          type="keydown"
        />
        {isSelecting && (
          <EventListener
            targetRef={toRefObject(mountDocument.body)}
            listener={this.handleMouseMove}
            type="mousemove"
          />
        )}
        {isSelecting && stardustDOMNode && (
          <EventListener
            targetRef={toRefObject(stardustDOMNode)}
            listener={this.handleStardustDOMNodeClick}
            type="click"
          />
        )}
        {isSelecting && stardustComponent && (
          <pre
            ref={this.selectorRef}
            style={{
              position: 'fixed',
              padding: 0,
              margin: 0,
              background: '#6495ed22',
              border: '1px solid #6495edcc',
              zIndex: 99999999,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                padding: '2px 4px',
                margin: '-1px 0 0 -1px',
                bottom: '100%',
                left: 0,
                color: '#fff',
                background: '#6495ed',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{`<${componentName} />`}</span>
            </div>
            {stardustDOMNode && (
              <div
                style={{
                  fontSize: '0.9em',
                  position: 'absolute',
                  padding: '2px 4px',
                  margin: '0 0 1px -1px',
                  top: '100%',
                  left: 0,
                  background: '#6495ed',
                }}
              >
                <strong style={{ fontWeight: 'bold', color: 'hsl(160, 100%, 80%)' }}>
                  {stardustDOMNode.tagName.toLowerCase()}
                </strong>
                {stardustDOMNode.hasAttribute('class') && (
                  <span style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                    .{(stardustDOMNode.getAttribute('class') || '').replace(/ +/g, '.')}
                  </span>
                )}
              </div>
            )}
          </pre>
        )}
        {!isSelecting && stardustInstance && (
          <DebugPanel
            componentName={componentName}
            cssStyles={stylesForNode(stardustDOMNode)}
            debugData={stardustInstance.stardustDebug}
          />
        )}
      </>
    )
  }
}

export default Debug
