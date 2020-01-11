import { isConformant, handlesAccessibility } from '../../commonTests'

import ToolbarRadioGroup from '@fluentui/react/src/components/Toolbar/ToolbarRadioGroup'
import { ReactWrapper } from 'enzyme'
import { mountWithProvider } from '../../../utils'
import * as React from 'react'

describe('ToolbarRadioGroup', () => {
  isConformant(ToolbarRadioGroup)

  describe('accessibility', () => {
    handlesAccessibility(ToolbarRadioGroup, {
      defaultRootRole: 'radiogroup',
    })
  })

  describe('variables', () => {
    function checkMergedVariables(toolbarRadioGroup: ReactWrapper): void {
      expect(
        (toolbarRadioGroup
          .find('ToolbarItem')
          .first()
          .prop('variables') as Function)(),
      ).toEqual(expect.objectContaining({ a: 'toolbarRadioGroup', b: 'overwritten', c: 'item' }))

      expect(
        (toolbarRadioGroup
          .find('ToolbarDivider')
          .first()
          .prop('variables') as Function)(),
      ).toEqual(
        expect.objectContaining({
          a: 'toolbarRadioGroup',
          b: 'overwrittenInDivider',
          c: 'divider',
        }),
      )
    }

    it('are passed from Toolbar to all kinds of children and correctly merged', () => {
      const toolbarRadioGroup = mountWithProvider(
        <ToolbarRadioGroup
          variables={{ a: 'toolbarRadioGroup', b: 'toolbarRadioGroup' }}
          items={[
            { key: 1, content: 'toolbar item', variables: { b: 'overwritten', c: 'item' } },
            {
              key: 'd1',
              kind: 'divider',
              variables: { b: 'overwrittenInDivider', c: 'divider' },
            },
          ]}
        />,
      )

      checkMergedVariables(toolbarRadioGroup)
    })

    it('as functions are passed from Toolbar to all kinds of children and correctly merged', () => {
      const toolbarRadioGroup = mountWithProvider(
        <ToolbarRadioGroup
          variables={() => ({ a: 'toolbarRadioGroup', b: 'toolbarRadioGroup' })}
          items={[
            { key: 1, content: 'toolbar item', variables: () => ({ b: 'overwritten', c: 'item' }) },
            {
              key: 'd1',
              kind: 'divider',
              variables: () => ({ b: 'overwrittenInDivider', c: 'divider' }),
            },
          ]}
        />,
      )

      checkMergedVariables(toolbarRadioGroup)
    })
  })

  describe('allows cycling between items using UP/DOWN arrow keys', () => {
    const arrowUp = 38
    const arrowDown = 40

    const getShorthandItems = (props?: { disabledItem?: number; focusedItem?: number }) => [
      {
        key: 'test-key1',
        tabIndex: props && props.focusedItem === 0 ? 0 : -1,
        disabled: props && props.disabledItem === 0,
      },
      {
        key: 'test-key2',
        tabIndex: props && props.focusedItem === 1 ? 0 : -1,
        disabled: props && props.disabledItem === 1,
      },
      {
        key: 'test-key3',
        tabIndex: props && props.focusedItem === 2 ? 0 : -1,
        disabled: props && props.disabledItem === 2,
      },
    ]

    const testKeyDown = (testName, items, keyCode, expectedFocusedIndex) => {
      it(`keyDown test - ${testName}`, () => {
        const radioButtons = mountWithProvider(<ToolbarRadioGroup items={items} />).find('button')

        const expectedActiveElement = radioButtons.at(expectedFocusedIndex).getDOMNode()

        expect(document.activeElement).not.toBe(expectedActiveElement)

        radioButtons.first().simulate('keyDown', { preventDefault() {}, keyCode, which: keyCode })

        expect(document.activeElement).toBe(expectedActiveElement)
      })
    }

    testKeyDown(
      'should move focus to next, second item',
      getShorthandItems({ focusedItem: 0 }),
      arrowDown,
      1,
    )
    testKeyDown(
      'should move focus to next, third item',
      getShorthandItems({ focusedItem: 1 }),
      arrowDown,
      2,
    )
    testKeyDown(
      'should move focus to previous, first item',
      getShorthandItems({ focusedItem: 1 }),
      arrowUp,
      0,
    )
    testKeyDown(
      'should move focus to first item when the focused item is the last one',
      getShorthandItems({ focusedItem: 2 }),
      arrowDown,
      0,
    )
    testKeyDown(
      'should move focus to last item when the focused item is the first one',
      getShorthandItems({ focusedItem: 0 }),
      arrowUp,
      2,
    )
  })
})
