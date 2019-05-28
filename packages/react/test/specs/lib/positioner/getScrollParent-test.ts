import getScrollParent from 'src/lib/positioner/getScrollParent'

const overflowStyles: Partial<CSSStyleDeclaration>[] = [
  { overflow: 'scroll' },
  { overflowX: 'auto' },
  { overflowY: 'overlay' },
  { overflowX: 'scroll', overflowY: 'auto' },
  { overflowX: 'scroll', overflowY: 'auto', overflow: 'overlay' },
]

const setStylesForElement = (element: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
  Object.keys(style).forEach(prop => {
    element.style[prop] = style[prop]
  })
}

const setStylesForElements = (elements: HTMLElement[], style: Partial<CSSStyleDeclaration>) =>
  elements.forEach(element => setStylesForElement(element, style))

const resetOverflowStyles = (element: HTMLElement) =>
  ['overflow', 'overflowX', 'overflowY'].map(prop => (element.style[prop] = ''))

const testsSetupFactory = () => {
  const treeElements = Array(4)
    .fill(undefined)
    .map(() => document.createElement('div'))
  const [element, nonScrollableParent, scrollableParent, scrollableGrandparent] = treeElements

  return {
    element,
    scrollableParent,
    scrollableGrandparent,

    init() {
      nonScrollableParent.appendChild(element) // first parent is non scrollable
      scrollableParent.appendChild(nonScrollableParent) // 2nd parent is scrollable; this is the result of the getScrollParent function
      scrollableGrandparent.appendChild(scrollableParent) // 3nd parent is not scrollable; this is the result of the getScrollParent function
      document.body.appendChild(scrollableGrandparent)
    },

    resetStyles() {
      treeElements.forEach(treeElement => resetOverflowStyles(treeElement))
    },

    destroy() {
      document.body.removeChild(scrollableGrandparent)
    },
  }
}

describe('getScrollParent', () => {
  const testsSetup = testsSetupFactory()
  beforeAll(() => testsSetup.init())
  beforeEach(() => testsSetup.resetStyles())

  describe('returns document.body', () => {
    test('when argument is document.body', () => {
      expect(getScrollParent(document.body)).toBe(document.body)
    })

    test('when argument is document.documentElement', () => {
      expect(getScrollParent(document.documentElement)).toBe(document.body)
    })

    test('when argument is document', () => {
      expect(getScrollParent(document)).toBe(document.body)
    })

    test('when there is no scrollable parent for the node argument', () => {
      expect(getScrollParent(testsSetup.element)).toBe(document.body)
    })
  })

  describe('returns the first parent node when there are scrollable parents for the node argument', () => {
    test('when there are scrollable parents for the node argument', () => {
      overflowStyles.forEach(styles => {
        setStylesForElements(
          [testsSetup.scrollableParent, testsSetup.scrollableGrandparent],
          styles,
        )

        expect(getScrollParent(testsSetup.element)).toBe(testsSetup.scrollableParent)
      })
    })

    test('when there are scrollable parents for the node argument and the node argument is scrollable', () => {
      overflowStyles.forEach(styles => {
        setStylesForElements(
          [testsSetup.element, testsSetup.scrollableParent, testsSetup.scrollableGrandparent],
          styles,
        )

        expect(getScrollParent(testsSetup.element)).toBe(testsSetup.scrollableParent)
      })
    })
  })

  afterAll(() => testsSetup.destroy())
})
