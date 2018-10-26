import { ICSSInJSStyle } from '../../../../../src/themes/types'
import { pxToRem } from '../../../../../src/lib'
import siteVars from '../siteVariables'

export const main: ICSSInJSStyle = {
  backgroundColor: '#155068',
  backgroundImage: `linear-gradient(#362b44, #275169, #66b36d)`,
  paddingTop: '90px',
  backgroundRepeat: 'no-repeat',
  margin: '0',
  color: siteVars.white,
  fontSize: pxToRem(20),
  fontFamily: '"Between1-Regular", Helvetica, Arial, sans-serif',
  '-webkit-font-smoothing': 'antialiased',
}

export const pageContainer: ICSSInJSStyle = {
  padding: `0 ${pxToRem(60)}`,
  margin: `${pxToRem(100)} auto ${pxToRem(120)} auto`,
  maxWidth: '1000px',
}

export const speakersGrid: ICSSInJSStyle = {
  margin: '30px 0',
  justifyItems: 'center',
}

export const header: ICSSInJSStyle = {
  color: siteVars.green,
  fontSize: pxToRem(84),
  marginTop: `-${pxToRem(20)}`,
}

export const headerDivider: ICSSInJSStyle = {
  marginTop: `-${pxToRem(35)}`,
  '::before': { background: siteVars.green, height: '2px' },
}

export const navbarMenuItem: ICSSInJSStyle = {
  '::before': { background: 'transparent' },
  ':hover': { background: siteVars.blue06, color: siteVars.green },
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
  background: siteVars.blue06,
  border: `3px solid ${siteVars.green}`,
  borderRadius: pxToRem(5),
  color: 'white',
  fontSize: pxToRem(14),
  height: 'auto',
  padding: '15px',

  ':hover': {
    backgroundColor: siteVars.green,
    borderColor: siteVars.green,
  },
}

export const footer: ICSSInJSStyle = {
  background: siteVars.black,
  position: 'relative',
  bottom: pxToRem(0),
  textAlign: 'center',
}

export const footerMenuItem: ICSSInJSStyle = {
  '::before': { background: 'transparent' },
  ':hover': { background: 'black', color: siteVars.green },
  color: 'white',
  fontSize: pxToRem(14),
  marginTop: pxToRem(20),
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
  color: siteVars.green,
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
  ':hover,:focus': {
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
