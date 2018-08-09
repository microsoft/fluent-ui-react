const listItemRules = {
  root: ({ props: { selection } }) => ({
    ...(selection && {
      position: 'relative',

      ':hover': {
        background: 'rgba(98, 100, 167, .8)',
        color: '#fff',
        cursor: 'pointer',
      },
    }),
  }),
}

export default listItemRules
