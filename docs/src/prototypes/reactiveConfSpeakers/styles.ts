import { ICSSInJSStyle } from '../../../../types/theme'
import { pxToRem } from '../../../../src/lib'

export const mainStyle: ICSSInJSStyle = {
  // width: 'calc(100% - 250px)',
  // position: 'fixed',
  // overflowY: 'scroll',
  backgroundColor: '#155068',
  // background-image: -webkit-gradient(linear, left top, left bottom, from(#060b24), color-stop(#175169), to(#56b36d));
  backgroundImage: 'linear-gradient(#060b24, #175169, #56b36d)',
  backgroundRepeat: 'no-repeat',
  margin: '0',
  color: '#ffffff',
  fontSize: pxToRem(20),
  fontFamily: '"Between1-Regular", Helvetica, Arial, sans-serif',
  '-webkit-font-smoothing': 'antialiased',
}

export const mainContentStyles: ICSSInJSStyle = {
  width: pxToRem(990),
  margin: '0 auto',
  marginTop: pxToRem(100),
}

export const navbarMenuStyles: ICSSInJSStyle = {
  border: 'transparent',
  height: pxToRem(24),
  background: 'black',
  position: 'relative',
  zIndex: 30,
  '-webkit-transform': 'translateZ(10px)',
  transform: 'translateZ(10px)',
}

export const navbarMenuItemStyles: ICSSInJSStyle = {
  '::before': { background: 'transparent' },
  ':hover': { background: 'black', color: '#56b36d' },
  color: 'white',
  fontSize: pxToRem(12),
  marginTop: `-${pxToRem(8)}`,
}

export const pageHeaderSpeakersStyles: ICSSInJSStyle = {
  color: '#56b36d',
  fontSize: pxToRem(84),
  marginTop: `-${pxToRem(20)}`,
}

export const pageHeaderDividerStyles: ICSSInJSStyle = {
  marginTop: `-${pxToRem(35)}`,
}

export const secondaryNavbarMenuItemStyles: ICSSInJSStyle = {
  '::before': { background: 'transparent' },
  ':hover': { background: 'rgb(6, 11, 36, 0.6)', color: '#56b36d' },
  color: 'white',
  fontSize: pxToRem(16),
  marginTop: pxToRem(15),
}

export const secondaryNavbarMenuStyles: ICSSInJSStyle = {
  zIndex: 10,
  marginBottom: 0,
  padding: 0,
  textTransform: 'uppercase',
  border: 'none',
  transform: 'translateZ(0px)',
  height: pxToRem(70),
  backgroundColor: 'rgb(6, 11, 36, 0.6)',
  width: pxToRem(1150),
}

export const secondaryNavbarButtonStyles: ICSSInJSStyle = {
  background: 'rgb(6, 11, 36, 0.6)',
  border: '3px solid #56b36d',
  borderRadius: pxToRem(0),
  color: 'white',
  fontSize: pxToRem(14),
  marginTop: pxToRem(20),
  padding: pxToRem(5),
}

export const imageStyles: ICSSInJSStyle = {
  marginTop: pxToRem(10),
}

export const secondaryNavbarScrollingItemStyles: ICSSInJSStyle = {
  width: pxToRem(1150),
  position: 'fixed',
  top: pxToRem(70),
  zIndex: 10,
  background: '#56b36d',
  textAlign: 'center',
}

export const footerStyles: ICSSInJSStyle = {
  background: 'black',
  height: pxToRem(160),
  position: 'relative',
  bottom: pxToRem(0),
  textAlign: 'center',
}

export const footerMenuItemStyles: ICSSInJSStyle = {
  '::before': { background: 'transparent' },
  ':hover': { background: 'black', color: '#56b36d' },
  color: 'white',
  fontSize: pxToRem(14),
  marginTop: pxToRem(20),
  fontWeight: 'bold',
}

export const footerMenuStyles: ICSSInJSStyle = {
  border: 'transparent',
  height: pxToRem(70),
  background: 'black',
  position: 'relative',
  margin: 'auto',
  width: pxToRem(990),
}

export const footerTextStyles: ICSSInJSStyle = {
  color: '#56b36d',
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
  ':hover': {
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
