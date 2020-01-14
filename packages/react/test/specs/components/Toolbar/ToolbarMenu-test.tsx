import * as React from 'react'
import { ToolbarMenu } from '@fluentui/react'

import { isConformant } from '../../commonTests'
import { mountWithProvider } from '../../../utils'
import { ReactWrapper } from 'enzyme'

describe('ToolbarMenu', () => {
  isConformant(ToolbarMenu)

  describe('variables', () => {
    function checkMergedVariables(toolbarMenu: ReactWrapper): void {
      expect(
        (toolbarMenu
          .find('ToolbarMenuItem')
          .first()
          .prop('variables') as Function)(),
      ).toEqual(expect.objectContaining({ a: 'toolbarMenu', b: 'overwritten', c: 'item' }))
    }

    it('are passed from Toolbar to all kinds of children and correctly merged', () => {
      const toolbarMenu = mountWithProvider(
        <ToolbarMenu
          variables={{ a: 'toolbarMenu', b: 'toolbarMenu' }}
          items={[
            { key: 1, content: 'toolbarMenu item', variables: { b: 'overwritten', c: 'item' } },
          ]}
        />,
      )

      checkMergedVariables(toolbarMenu)
    })

    it('as functions are passed from Toolbar to all kinds of children and correctly merged', () => {
      const toolbarMenu = mountWithProvider(
        <ToolbarMenu
          variables={() => ({ a: 'toolbarMenu', b: 'toolbarMenu' })}
          items={[
            {
              key: 1,
              content: 'toolbarMenu item',
              variables: () => ({ b: 'overwritten', c: 'item' }),
            },
          ]}
        />,
      )

      checkMergedVariables(toolbarMenu)
    })
  })
})
