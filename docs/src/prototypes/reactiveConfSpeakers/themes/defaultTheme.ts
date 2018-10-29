import { pxToRem } from '../../../../../src/lib'
import { ThemeInput } from 'src/themes/types'

const style = cssStyles => ({
  root: cssStyles,
})

/**
 * Theme object that contains CSS-like objects that define styles for individual components.
 */
export default {
  /**
   * styling variables of the app (analog of SASS/LESS variables)
   */
  siteVariables: {
    green: '#56b36d',
    blue06: 'rgb(6, 11, 36, 0.6)',
    black: 'black',
    gray: '#2A2A2A',
    white: 'white',
  },

  /**
   * Styles defined per component type
   */
  componentStyles: {
    'Dusty(MainContainer)': style(({ siteVariables }) => ({
      position: 'relative',
      backgroundColor: '#155068',
      backgroundImage: `linear-gradient(#362b44, #275169, #66b36d)`,
      paddingTop: '90px',
      backgroundRepeat: 'no-repeat',
      margin: '0',
      color: siteVariables.white,
      fontSize: pxToRem(20),
      fontFamily: '"Between1-Regular", Helvetica, Arial, sans-serif',
      '-webkit-font-smoothing': 'antialiased',
    })),

    'Dusty(Navbar)': style({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#261b34',
      padding: '5px 0',
      width: '100%',
      position: 'fixed',
      margin: '0 0 0 -125px',
      top: '0px',
      zIndex: 30,
    }),

    'Dusty(PageContainer)': style({
      padding: `0 ${pxToRem(60)}`,
      margin: `${pxToRem(100)} auto ${pxToRem(120)} auto`,
      maxWidth: '1000px',
    }),

    'Dusty(Footer)': style(({ siteVariables }) => ({
      background: siteVariables.black,
      position: 'relative',
      bottom: pxToRem(0),
      textAlign: 'center',
    })),

    'Dusty(Speakers)': style({
      margin: '45px 0 30px 0',
    }),

    'Dusty(Speaker)': style({
      position: 'relative',
      width: pxToRem(240),
      height: pxToRem(340),
      color: '#192b4f',
      margin: '10px 0',
      '::before': {
        content: '""',
        position: 'absolute',
        height: pxToRem(340),
        left: 0,
        bottom: 0,
        display: 'block',
        width: pxToRem(240),
        backgroundImage:
          'linear-gradient(to bottom, rgba(94, 117, 179, 0) 0%, rgba(94, 117, 179, 0.3) 40%, #5e75b3 70%, #5e75b3 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      },
      ':hover': {
        '::before': {
          backgroundImage:
            'linear-gradient(to bottom, rgba(94, 117, 179, 0) 0%, rgba(94, 117, 179, 0.3) 40%, #67b579 70%, #55af6a 100%)',
        },
      },
    }),

    'Dusty(SpeakerCardContent)': style({
      width: pxToRem(200),
      margin: 'auto',
      position: 'absolute',
      bottom: pxToRem(20),
      left: pxToRem(20),
      fontSize: pxToRem(20),
    }),
  },
} as ThemeInput
