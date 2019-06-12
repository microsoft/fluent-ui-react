import { isConformant } from 'test/specs/commonTests'

import ToolbarRadioGroup from 'src/components/Toolbar/ToolbarRadioGroup'
import { ReactWrapper } from 'enzyme'
import { mountWithProvider } from 'test/utils'
import * as React from 'react'

describe('ToolbarRadioGroup', () => {
  isConformant(ToolbarRadioGroup)

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
})
