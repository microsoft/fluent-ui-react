import { CopyToClipboard } from '@stardust-ui/docs-components'
import {
  ComponentSlotStylesInput,
  ComponentSlotStyle,
  createComponent,
  Icon,
  ICSSInJSStyle,
} from '@stardust-ui/react'
import * as Color from 'color'
import * as _ from 'lodash'
import * as React from 'react'

type ColorBoxProps = {
  children?: React.ReactNode
  name?: string
  copyToClipboardIcon?: boolean
  rounded?: boolean
  size?: 'small' | 'normal' | 'big'
  value: string
  styles?: ComponentSlotStyle
}

type ColorBoxVariables = {
  colorBlack: string
  colorWhite: string
  fontSize: {
    big: string
    normal: string
    small: string
  }
  padding: {
    big: string
    normal: string
    small: string
  }
}

export const colorBoxVariables = (siteVariables): ColorBoxVariables => ({
  colorBlack: siteVariables.colors.black,
  colorWhite: siteVariables.colors.white,
  fontSize: {
    big: '1.25em',
    small: '.85em',
    normal: '1.25em',
  },
  padding: {
    big: '4rem .75rem .75rem .75rem',
    small: '.75rem',
    normal: '2.5rem .75rem .75rem .75rem',
  },
})

export const colorBoxStyles: ComponentSlotStylesInput<ColorBoxProps, ColorBoxVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundColor: p.value,
    border: '1px solid transparent',
    borderRadius: p.rounded && '.25rem',
    color: p.value !== undefined && Color(p.value).isDark() ? v.colorWhite : v.colorBlack,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    fontSize: v.padding[p.size],
    padding: v.padding[p.size],
  }),
  name: {
    fontWeight: 'bold',
  },
  value: {
    fontFamily: 'Monospace',
    textAlign: 'right',
    userSelect: 'all',

    '> span': {
      cursor: 'pointer',
    },
  },
}

const ColorBox = createComponent<ColorBoxProps>({
  displayName: 'ColorBox',
  render: ({ children, name, value, copyToClipboardIcon, stardust: { classes } }) => (
    <div className={classes.root}>
      <div className={classes.name}>{children || _.startCase(name)}</div>

      {copyToClipboardIcon && (
        <CopyToClipboard value={value}>
          {(active, onClick) => (
            <div className={classes.value}>
              <span onClick={onClick}>
                {value && <Icon name={active ? 'checkmark' : 'copy outline'} size="small" />}
                {value || 'Not defined'}
              </span>
            </div>
          )}
        </CopyToClipboard>
      )}
    </div>
  ),
})

ColorBox.defaultProps = {
  size: 'normal',
  copyToClipboardIcon: true,
}

export default ColorBox
