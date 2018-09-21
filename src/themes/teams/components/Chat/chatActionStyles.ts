import { ICSSInJSStyle } from '../../../../../types/theme'
import { pxToRem } from '../../../../lib'
import { IChatActionProps } from '../../../../components/Chat/ChatAction'

const chatMessageStyles = {
  root: ({ variables }: { props: IChatActionProps; variables: any }): ICSSInJSStyle => ({
    marginTop: '1rem',
    marginBottom: '1rem',
    fontSize: variables.fontSize,
  }),

  icon: (): ICSSInJSStyle => ({
    width: pxToRem(32),
    margin: `0 ${pxToRem(10)} 0 0`,
  }),

  timestamp: (): ICSSInJSStyle => ({
    marginLeft: pxToRem(10),
  }),
}

export default chatMessageStyles
