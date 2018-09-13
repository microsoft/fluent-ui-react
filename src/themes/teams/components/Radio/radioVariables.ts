import { pxToRem } from '../../../../lib'
import { IRadioProps } from '../../../../components/Radio/Radio'

export default (siteVars: any, props: IRadioProps) => {
  const { checked } = props

  return {
    fontWeight: 400,
    radioMargin: `${pxToRem(10)}`,
    disabledColor: siteVars.gray06,

    // variables for the icon part
    icon: {
      margin: `0 ${pxToRem(10)} 0 0`,
      color: checked ? siteVars.white : siteVars.brand,
      backgroundColor: checked ? siteVars.brand : siteVars.white,
      borderColor: checked ? siteVars.white : siteVars.brand,
    },
  }
}
