import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { IChatMessageVariables } from './chatMessageVariables'
import { pxToRem } from '../../../../lib'

const chatMessageStyles: IComponentPartStylesInput<IChatMessageProps, IChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    position: 'relative',
    marginTop: '1rem',
    marginBottom: '1rem',
    ...(p.mine
      ? {
          marginLeft: 'auto',
        }
      : {
          marginRight: 'auto',
        }),
    maxWidth: v.messageWidth,
  }),

  avatar: (): ICSSInJSStyle => ({
    margin: pxToRem(10),
  }),

  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    flex: 1,
    padding: '1rem',
    color: 'rgb(64, 64, 64)',
    backgroundColor: p.mine ? v.messageColorMine : v.messageColor,
    borderRadius: '0.3rem',
  }),
}

export default chatMessageStyles
