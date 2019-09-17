import * as React from 'react'
import * as _ from 'lodash'
import {
  Toolbar,
  Tooltip,
  ToolbarItemShorthandKinds,
  tooltipAsLabelBehavior,
} from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const ToolbarExampleShorthand = () => {
  const [isBold, setBold] = useBooleanKnob({ name: 'bold', initialValue: true })
  const [isItalic, setItalic] = useBooleanKnob({ name: 'isItalic', initialValue: false })

  const [moreMenuOpen, setMoreMenuOpen] = useBooleanKnob({
    name: 'moreMenuOpen',
    initialValue: false,
  })

  return (
    <Toolbar
      items={[
        {
          key: 'bold',
          kind: 'toggle' as ToolbarItemShorthandKinds,
          active: isBold,
          tooltip: 'Bold',
          icon: { name: 'bold', outline: true },
          onClick: () => setBold(!isBold),
        },
        {
          key: 'italic',
          kind: 'toggle' as ToolbarItemShorthandKinds,
          active: isItalic,
          tooltip: 'Italic',
          icon: { name: 'italic', outline: true },
          onClick: () => setItalic(!isItalic),
        },
        { key: 'divider1', kind: 'divider' as ToolbarItemShorthandKinds },
        {
          key: 'more',
          icon: { name: 'more', outline: true },
          active: moreMenuOpen,
          tooltip: 'More options',
          menu: [
            {
              key: 'quote',
              content: 'Quote',
              icon: 'quote',
            },
            {
              key: 'code-snippet',
              content: 'Code snippet',
              icon: 'code-snippet',
            },
          ],
          menuOpen: moreMenuOpen,
          onMenuOpenChange: (e, { menuOpen }) => setMoreMenuOpen(menuOpen),
        },
      ].map(item =>
        _.isNil(item.tooltip)
          ? item
          : render =>
              render(
                item,
                // rendering Tooltip for the Toolbar Item
                (ToolbarItem, props) => {
                  const { tooltip, key, ...rest } = props
                  // Adding tooltipAsLabelBehavior as the ToolbarItems contains only icon
                  return (
                    <Tooltip
                      key={key}
                      trigger={<ToolbarItem {...rest} />}
                      accessibility={tooltipAsLabelBehavior}
                      content={tooltip}
                    />
                  )
                },
              ),
      )}
    />
  )
}

export default ToolbarExampleShorthand
