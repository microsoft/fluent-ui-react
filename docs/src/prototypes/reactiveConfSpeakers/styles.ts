import { ICSSInJSStyle } from '../../../../src/themes/types'
import { pxToRem } from '../../../../src/lib'
import siteVars from './siteVariables'

export const defaultSpacingStyles: ICSSInJSStyle = { padding: `0 ${pxToRem(60)}` }

export const mainStyles: ICSSInJSStyle = {
  backgroundColor: '#155068',
  backgroundImage: `linear-gradient(#060b24, #175169, ${siteVars.green})`,
  backgroundRepeat: 'no-repeat',
  margin: '0',
  color: siteVars.white,
  fontSize: pxToRem(20),
  fontFamily: '"Between1-Regular", Helvetica, Arial, sans-serif',
  '-webkit-font-smoothing': 'antialiased',
}

export const mainContentStyles: ICSSInJSStyle = {
  ...defaultSpacingStyles,
  margin: `${pxToRem(80)} auto ${pxToRem(60)} auto`,
  justifyItems: 'center',
}

export const defaultMenuStyles: ICSSInJSStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  border: 'transparent',
  height: pxToRem(24),
  background: siteVars.black,
  zIndex: 30,
}

export const defaultMenuItemStyles: ICSSInJSStyle = {
  fontSize: pxToRem(16),
  '::before': { background: 'transparent' },
}

export const navbarMenuItemStyles: ICSSInJSStyle = {
  fontSize: pxToRem(12),
  padding: '0 1.125rem',
}

export const pageHeaderSpeakersStyles: ICSSInJSStyle = {
  color: siteVars.green,
  fontSize: pxToRem(84),
  marginTop: `-${pxToRem(20)}`,
}

export const pageHeaderDividerStyles: ICSSInJSStyle = {
  marginTop: `-${pxToRem(35)}`,
}

export const secondaryNavbarMenuStyles: ICSSInJSStyle = {
  ...defaultSpacingStyles,
  zIndex: 10,
  textTransform: 'uppercase',
  justifyContent: 'initial',
  width: '100%',
  height: pxToRem(70),
  backgroundColor: siteVars.blue06,
}

const greenBackground = { backgroundColor: siteVars.green }
export const secondaryNavbarButtonStyles: ICSSInJSStyle = {
  backgroundColor: siteVars.blue06,
  border: `3px solid ${siteVars.green}`,
  borderColor: siteVars.green,
  borderRadius: pxToRem(0),
  color: siteVars.white,
  fontSize: pxToRem(14),
  padding: pxToRem(5),
  ':hover': greenBackground,
  ':focus': {
    ...greenBackground,
    borderColor: siteVars.green,
  },
}

export const secondaryNavbarScrollingItemStyles: ICSSInJSStyle = {
  ...defaultSpacingStyles,
  position: 'fixed',
  top: pxToRem(70),
  zIndex: 10,
  background: siteVars.green,
  textAlign: 'center',
}

export const footerStyles: ICSSInJSStyle = {
  background: siteVars.black,
  height: pxToRem(160),
  position: 'relative',
  bottom: pxToRem(0),
  textAlign: 'center',
}

export const footerMenuStyles: ICSSInJSStyle = {
  height: pxToRem(70),
  fontWeight: 'bold',
}

export const footerMenuItemStyles: ICSSInJSStyle = {
  fontSize: pxToRem(14),
  marginTop: pxToRem(20),
}

export const footerTextStyles: ICSSInJSStyle = {
  width: '70%',
  margin: 'auto',
}

export const speakerStyles: ICSSInJSStyle = {
  position: 'relative',
  width: pxToRem(240),
  height: pxToRem(340),
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
  ':hover,:focus': {
    '::before': {
      backgroundImage:
        'linear-gradient(to bottom, rgba(94, 117, 179, 0) 0%, rgba(94, 117, 179, 0.3) 40%, #67b579 70%, #55af6a 100%)',
    },
  },
}

export const speakerContentStyles: ICSSInJSStyle = {
  width: pxToRem(200),
  margin: 'auto',
  position: 'absolute',
  top: pxToRem(220),
  left: pxToRem(20),
  fontSize: pxToRem(20),
}

export const speakerImageStyles: ICSSInJSStyle = {
  height: pxToRem(20),
  zIndex: 3,
  position: 'relative',
  display: 'block',
}

export const speakerTextStyles: ICSSInJSStyle = {
  zIndex: 3,
  position: 'relative',
  display: 'block',
}
