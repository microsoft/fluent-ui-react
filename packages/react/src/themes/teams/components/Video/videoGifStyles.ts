import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { pxToRem } from 'src/lib'
import { VideoGifProps, VideoGifState } from '../../../../components/Video/VideoGif'

export default {
  root: ({ props, variables }): ICSSInJSStyle => {
    const isFromKeyboard = { props }

    return {
      boxSizing: 'border-box',
      display: 'inline-block',
      verticalAlign: 'middle',
      position: 'relative',
      cursor: 'pointer',
      width: variables.width,
      height: variables.height || 'auto',
      outline: 0,
      ...(isFromKeyboard && {
        ':focus': {
          '::after': {
            borderColor: variables.focusBorderColor,
            opacity: 1,
          },
        },
      }),
      '::after': {
        background: `0 no-repeat rgba(0,0,0,.25)`,
        backgroundPositionX: props.isPlaying ? pxToRem(3) : pxToRem(3),
        borderWidth: pxToRem(2),
        borderStyle: 'solid',
        borderColor: 'transparent',
        fontWeight: 600,
        fontSize: pxToRem(24),
        opacity: props.isPlaying ? 0 : 1,
        transition: 'opacity .22s ease-in-out',
        content: `url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3C${
          props.isPlaying
            ? `g%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M12.5%2C22V10h1v12H12.5z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M18.5%2C22V10h1v12H18.5z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E")`
            : `path%20fill%3D%22%23fff%22%20d%3D%22M11%2C9l10%2C7l-10%2C7V9z%20M12%2C10.9219v10.1562L19.2578%2C16L12%2C10.9219z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E%0A")`
        }`,
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: pxToRem(60),
        width: pxToRem(60),
        lineHeight: pxToRem(60),
        margin: `${pxToRem(-30)} 0 0 ${pxToRem(-30)}`,
        textAlign: 'center',
        pointerEvents: 'none',
      },
      ':hover::after': {
        opacity: 1,
      },
    }
  },
} as ComponentSlotStylesInput<VideoGifProps & VideoGifState, any>
