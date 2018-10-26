import { ICSSInJSStyle } from '../../../../../src/themes/types'
import { pxToRem } from '../../../../../src/lib'

export const green = '#56b36d'
export const secondaryNavbarBackground = 'rgb(6, 11, 36, 0.6)'

export const main: ICSSInJSStyle = {
  backgroundColor: '#155068',
  backgroundImage: `linear-gradient(#362b44, #275169, #66b36d)`,
  paddingTop: '90px',
  backgroundRepeat: 'no-repeat',
  margin: '0',
  color: '#ffffff',
  fontSize: pxToRem(20),
  fontFamily: '"Between1-Regular", Helvetica, Arial, sans-serif',
  '-webkit-font-smoothing': 'antialiased',
}

export const mainContent: ICSSInJSStyle = {
  padding: `0 ${pxToRem(60)}`,
  margin: `0 auto ${pxToRem(120)} auto`,
  marginTop: pxToRem(100),
  justifyItems: 'center',
  maxWidth: '1000px',
}

export const header: ICSSInJSStyle = {
  color: green,
  fontSize: pxToRem(84),
  marginTop: `-${pxToRem(20)}`,
}

export const headerDivider: ICSSInJSStyle = {
  marginTop: `-${pxToRem(35)}`,
}

export const navbarMenuItem: ICSSInJSStyle = {
  '::before': { background: 'transparent' },
  ':hover': { background: secondaryNavbarBackground, color: green },
  color: 'white',
  fontSize: pxToRem(16),
  display: 'flex',
  alignItems: 'center',
}

export const navbarMenu: ICSSInJSStyle = {
  width: '100%',
  zIndex: 10,
  marginBottom: 0,
  padding: `0 ${pxToRem(30)}`,
  textTransform: 'uppercase',
  border: 'none',
  transform: 'translateZ(0px)',
  height: pxToRem(70),
}

export const navbarButton: ICSSInJSStyle = {
  background: secondaryNavbarBackground,
  border: `3px solid ${green}`,
  borderRadius: pxToRem(5),
  color: 'white',
  fontSize: pxToRem(14),
  height: 'auto',
  padding: '15px',

  ':hover': {
    backgroundColor: green,
    borderColor: green,
  },
}

export const secondaryNavbarScrollingItemStyles: ICSSInJSStyle = {
  position: 'fixed',
  top: pxToRem(70),
  zIndex: 10,
  background: green,
  textAlign: 'center',
  padding: `0 ${pxToRem(60)}`,
}

export const footer: ICSSInJSStyle = {
  background: 'black',
  position: 'relative',
  bottom: pxToRem(0),
  textAlign: 'center',
}

export const footerMenuItem: ICSSInJSStyle = {
  '::before': { background: 'transparent' },
  ':hover': { background: 'black', color: green },
  color: 'white',
  fontSize: pxToRem(14),
  marginTop: pxToRem(20),
  fontWeight: 'bold',
  height: 'auto',
}

export const footerMenu: ICSSInJSStyle = {
  border: 'transparent',
  height: pxToRem(70),
  background: 'black',
  position: 'relative',
  margin: 'auto',
  width: pxToRem(990),
}

export const footerText: ICSSInJSStyle = {
  color: green,
  width: '70%',
  margin: 'auto',
  padding: '45px 0',
}

export const speakerCard: ICSSInJSStyle = {
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
}

export const speakerCardContent: ICSSInJSStyle = {
  width: pxToRem(200),
  margin: 'auto',
  position: 'absolute',
  bottom: pxToRem(10),
  left: pxToRem(20),
  fontSize: pxToRem(20),
}

export const speakerImage: ICSSInJSStyle = {
  height: pxToRem(20),
  zIndex: 3,
  position: 'relative',
  display: 'block',
}

export const speakerText: ICSSInJSStyle = {
  zIndex: 3,
  position: 'relative',
  display: 'block',
}
