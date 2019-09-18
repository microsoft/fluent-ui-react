import { LDSComponentSlotStylesInput } from './types'

const componentStyles: LDSComponentSlotStylesInput = {
  Avatar: {
    root: () => ({
      width: '2rem',
      height: '2rem',
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '50%',
      lineHeight: 1,
      fontSize: '0.875rem',
      color: 'white',
      marginRight: '0.5rem',
      minWidth: '2rem',
    }),
    label: () => ({
      cursor: 'default',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      height: '100%',
      backgroundColor: '#f3f2f2',
      color: '#3e3e3c',
      textShadow: 'none',

      '[title]': {
        textDecoration: 'none',
      },
    }),
  },
  Chat: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  ChatBookend: {
    root: ({ props: p }) => ({
      alignItems: 'center',
      border: '#dddbda 0 solid',
      borderBottomWidth: '1px',
      color: '#3e3e3c',
      display: 'flex',
      fontSize: '0.812rem',
      justifyContent: 'center',
      padding: '0.5rem 0.75rem',
      width: '100%',

      ...(p.attached === 'bottom' && {
        borderWidth: '1px 0 0',
      }),
    }),
  },
  ChatBody: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  ChatContent: {
    root: ({ props: p, variables: v }) => ({
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
      display: 'inline-block',
      fontSize: '0.812rem',
      maxWidth: '26.25rem',
      whiteSpace: 'pre-line',

      padding: '0.5rem',
      marginRight: 'auto',
      backgroundColor: '#f2f2f3',
      borderRadius: '0.5rem 0.5rem 0.5rem 0',
      color: '#080707',
      minHeight: '2rem',

      ...(v.isMine && {
        backgroundColor: '#6b6d70',
        borderRadius: '0.5rem 0.5rem 0',
        color: 'white',
      }),
    }),
  },
  ChatItem: {
    root: ({ props: p, variables: v }) => ({
      display: 'flex',
      marginTop: '0.75rem',

      ...(v.isBookend && {
        margin: '1rem 0',
        marginLeft: '-0.75rem',
        marginRight: '-0.75rem',
      }),
      ...(v.isMine && {
        justifyContent: 'flex-end',
      }),
    }),
  },
  ChatMessage: {
    root: {
      display: 'flex',
    },
  },
  ChatMeta: {
    root: {
      color: '#3e3e3c',
      fontSize: '0.625rem',
      margin: '0.125rem 0 0 0.5rem',
    },
  },
  Icon: {
    root: {
      display: 'inline-block',
      borderRadius: '0.25rem',
      lineHeight: 1,
      marginRight: '0.5rem',
    },
    svg: {
      fill: '#706e6b',
      width: '1rem',
      height: '1rem',
      lineHeight: '1',
      verticalAlign: 'middle',
    },
  },
  ProviderBox: {
    root: {
      background: '#fff',
    },
  },
}

export default componentStyles
