import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { ISwatchcpBaseProps } from '../../../../components/Swatchcp/SwatchcpBase'
const swatchcpBaseStyles: IComponentPartStylesInput = {
  root: ({ props }: { props: ISwatchcpBaseProps }): ICSSInJSStyle => {
    return {
      outline: 0,
      border: '2px solid white',
      display: 'inline-block',
      // height : "21px",
      // width : "19px",
      // padding : "5px"
      ...(props.active && {
        border: '2px solid gray',
        borderRadius: '2px',
      }),
      ':hover': {
        border: '2px solid lightgray',
        borderRadius: '2px',
      },
    }
  },
}

export default swatchcpBaseStyles
