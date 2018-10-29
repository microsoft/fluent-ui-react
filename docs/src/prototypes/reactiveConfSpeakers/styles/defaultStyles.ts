import { ICSSInJSStyle } from '../../../../../src/themes/types'
import { pxToRem } from '../../../../../src/lib'
import siteVars from './siteVariables'

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

export const footerMenuItem: ICSSInJSStyle = {
  '::before': { background: 'transparent' },
  ':hover': { background: 'black', color: siteVars.green },
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

export const speakerImage: ICSSInJSStyle = {
  height: pxToRem(20),
  zIndex: 3,
  position: 'relative',
  display: 'block',
}

export const speakerText: ICSSInJSStyle = {
  color: siteVars.white,
  zIndex: 3,
  position: 'relative',
  display: 'block',
}

export const speakerButton: ICSSInJSStyle = {
  zIndex: 3,
  margin: '10px 0 0 0',
  color: '#192b4f',
}
