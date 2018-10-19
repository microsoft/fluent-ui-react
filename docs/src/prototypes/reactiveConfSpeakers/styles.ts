import { ICSSInJSStyle } from '../../../../types/theme'

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
  fontSize: '20px',
  fontFamily: '"Between1-Regular", Helvetica, Arial, sans-serif',
  '-webkit-font-smoothing': 'antialiased',
}

export const mainContent: ICSSInJSStyle = {
  width: '990px',
  margin: '0 auto',
  marginTop: '100px',
}
