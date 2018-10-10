import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IChatMessageProps } from '../../../../components/Chat/ChatMessage'
import { IChatMessageVariables } from './chatMessageVariables'
// import { pxToRem } from '../../../../lib'

// const px10asRem = pxToRem(10)
const chatMessageStyles: IComponentPartStylesInput<IChatMessageProps, IChatMessageVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-grid',
    // display: 'inline-block',
    position: 'relative',
    marginTop: '1rem',
    marginBottom: '1rem',
    ...(p.mine && {
      float: 'right',
    }),
    maxWidth: v.messageWidth,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  }),

  avatar: ({ props: p }: { props: IChatMessageProps }): ICSSInJSStyle => ({
    gridArea: 'avatar',
    // marginTop: px10asRem,
    // marginBottom: px10asRem,
    // marginLeft: p.mine ? px10asRem : 0,
    // marginRight: p.mine ? 0 : px10asRem,
  }),

  author: ({ props: p, variables: v }): ICSSInJSStyle => ({
    gridArea: 'author',
    borderTopLeftRadius: '0.3rem',
    // marginRight: px10asRem,
  }),

  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    gridArea: 'content',
    padding: '1rem',
    color: 'rgb(64, 64, 64)',
    backgroundColor: p.mine ? v.messageColorMine : v.messageColor,
    borderRadius: '0.3rem',
  }),

  timestamp: ({ props: p, variables: v }): ICSSInJSStyle => ({
    gridArea: 'timestamp',
    // marginRight: px10asRem,
  }),
}

export default chatMessageStyles
