// Taken from https://github.com/ten1seven/what-input/blob/master/src/scripts/what-input.js

/*
 * variables
 */

// cache document.documentElement
const docElem = document.documentElement

// currently focused dom element
let currentElement = null

// last used input type
let currentInput = 'initial'

// last used input intent
let currentIntent = currentInput

// check for sessionStorage support
// then check for session variables and use if available
try {
  if (window.sessionStorage.getItem('what-input')) {
    currentInput = window.sessionStorage.getItem('what-input')
  }

  if (window.sessionStorage.getItem('what-intent')) {
    currentIntent = window.sessionStorage.getItem('what-intent')
  }
} catch (e) {}

// event buffer timer
let eventTimer = null

// form input types
const formInputs = ['input', 'select', 'textarea']

// list of modifier keys commonly used with the mouse and
// can be safely ignored to prevent false keyboard detection
const ignoreMap = [
  16, // shift
  17, // control
  18, // alt
  91, // Windows key / left Apple cmd
  93, // Windows menu / right Apple cmd
]

// mapping of events to input types
const inputMap = {
  keydown: 'keyboard',
  keyup: 'keyboard',
  mousedown: 'mouse',
  mousemove: 'mouse',
  MSPointerDown: 'pointer',
  MSPointerMove: 'pointer',
  pointerdown: 'pointer',
  pointermove: 'pointer',
  touchstart: 'touch',
}

// boolean: true if touch buffer is active
let isBuffering = false

// boolean: true if the page is being scrolled
let isScrolling = false

// store current mouse position
const mousePos = {
  x: null,
  y: null,
}

// map of IE 10 pointer events
const pointerMap = {
  2: 'touch',
  3: 'touch', // treat pen like touch
  4: 'mouse',
}

// check support for passive event listeners
let supportsPassive = false

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: () => {
      supportsPassive = true
    },
  })

  window.addEventListener('test', null, opts)
} catch (e) {}

/*
 * set up
 */

const setUp = () => {
  // add correct mouse wheel event mapping to `inputMap`
  inputMap[detectWheel()] = 'mouse'

  addListeners()
  doUpdate('input')
  doUpdate('intent')
}

/*
 * events
 */

const addListeners = () => {
  // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
  // can only demonstrate potential, but not actual, interaction
  // and are treated separately
  const options = supportsPassive ? { passive: true, useCapture: true } : true

  // pointer events (mouse, pen, touch)
  // @ts-ignore
  if (window.PointerEvent) {
    window.addEventListener('pointerdown', setInput)
    window.addEventListener('pointermove', setIntent)
    // @ts-ignore
  } else if (window.MSPointerEvent) {
    window.addEventListener('MSPointerDown', setInput)
    window.addEventListener('MSPointerMove', setIntent)
  } else {
    // mouse events
    window.addEventListener('mousedown', setInput, true)
    window.addEventListener('mousemove', setIntent, true)

    // touch events
    if ('ontouchstart' in window) {
      window.addEventListener('touchstart', eventBuffer, options)
      window.addEventListener('touchend', setInput, true)
    }
  }

  // mouse wheel
  window.addEventListener(detectWheel(), setIntent, options)

  // keyboard events
  window.addEventListener('keydown', eventBuffer, true)
  window.addEventListener('keyup', eventBuffer, true)

  // focus events
  window.addEventListener('focusin', setElement)
  window.addEventListener('focusout', clearElement)
}

// checks conditions before updating new input
const setInput = event => {
  // only execute if the event buffer timer isn't running
  if (!isBuffering) {
    const eventKey = event.which
    let value = inputMap[event.type]

    if (value === 'pointer') {
      value = pointerType(event)
    }

    const ignoreMatch = ignoreMap.indexOf(eventKey) === -1
    const shouldUpdate =
      (value === 'keyboard' && eventKey && ignoreMatch) || value === 'mouse' || value === 'touch'

    if (currentInput !== value && shouldUpdate) {
      currentInput = value

      try {
        window.sessionStorage.setItem('what-input', currentInput)
      } catch (e) {}

      doUpdate('input')
    }

    if (currentIntent !== value && shouldUpdate) {
      // preserve intent for keyboard typing in form fields
      const activeElem = document.activeElement
      const notFormInput =
        activeElem &&
        activeElem.nodeName &&
        formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1

      if (notFormInput) {
        currentIntent = value

        try {
          window.sessionStorage.setItem('what-intent', currentIntent)
        } catch (e) {}

        doUpdate('intent')
      }
    }
  }
}

// updates the doc and `inputTypes` array with new input
const doUpdate = which => {
  docElem.setAttribute(`data-what${which}`, which === 'input' ? currentInput : currentIntent)
}

// updates input intent for `mousemove` and `pointermove`
const setIntent = event => {
  // test to see if `mousemove` happened relative to the screen to detect scrolling versus mousemove
  detectScrolling(event)

  // only execute if the event buffer timer isn't running
  // or scrolling isn't happening
  if (!isBuffering && !isScrolling) {
    let value = inputMap[event.type]
    if (value === 'pointer') {
      value = pointerType(event)
    }

    if (currentIntent !== value) {
      currentIntent = value

      try {
        window.sessionStorage.setItem('what-intent', currentIntent)
      } catch (e) {}

      doUpdate('intent')
    }
  }
}

const setElement = event => {
  if (!event.target.nodeName) {
    // If nodeName is undefined, clear the element
    // This can happen if click inside an <svg> element.
    clearElement()
    return
  }

  currentElement = event.target.nodeName.toLowerCase()
  docElem.setAttribute('data-whatelement', currentElement)

  if (event.target.classList && event.target.classList.length) {
    docElem.setAttribute('data-whatclasses', event.target.classList.toString().replace(' ', ','))
  }
}

const clearElement = () => {
  currentElement = null

  docElem.removeAttribute('data-whatelement')
  docElem.removeAttribute('data-whatclasses')
}

// buffers events that frequently also fire mouse events
const eventBuffer = event => {
  // set the current input
  setInput(event)

  // clear the timer if it happens to be running
  window.clearTimeout(eventTimer)

  // set the isBuffering to `true`
  isBuffering = true

  // run the timer
  eventTimer = window.setTimeout(() => {
    // if the timer runs out, set isBuffering back to `false`
    isBuffering = false
  }, 100)
}

/*
 * utilities
 */

const pointerType = event => {
  if (typeof event.pointerType === 'number') {
    return pointerMap[event.pointerType]
  }

  // treat pen like touch
  return event.pointerType === 'pen' ? 'touch' : event.pointerType
}

// detect version of mouse wheel event to use
// via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
const detectWheel = () => {
  let wheelType

  // Modern browsers support "wheel"
  if ('onwheel' in document.createElement('div')) {
    wheelType = 'wheel'
  } else {
    // Webkit and IE support at least "mousewheel"
    // or assume that remaining browsers are older Firefox
    wheelType =
      // @ts-ignore
      document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll'
  }

  return wheelType
}

const detectScrolling = event => {
  if (mousePos['x'] !== event.screenX || mousePos['y'] !== event.screenY) {
    isScrolling = false

    mousePos['x'] = event.screenX
    mousePos['y'] = event.screenY
  } else {
    isScrolling = true
  }
}

// don't start script unless browser cuts the mustard
// (also passes if polyfills are used)
if ('addEventListener' in window && Array.prototype.indexOf) {
  setUp()
}

// returns string: the current input type
// opt: 'intent'|'input'
// 'input' (default): returns the same value as the `data-whatinput` attribute
// 'intent': includes `data-whatintent` value if it's different than `data-whatinput`
export const ask = (opt?: 'intent' | 'input'): string => {
  return opt === 'intent' ? currentIntent : currentInput
}

export const isFromKeyboard = (): boolean => ask() === 'keyboard'
