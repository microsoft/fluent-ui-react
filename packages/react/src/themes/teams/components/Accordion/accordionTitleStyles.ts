const accordionTitleStyles = {
  root: () => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: 'pointer',

    ':hover': {
      [`.ui-indicator`]: {
        opacity: 1,
      },
    },
  }),
  indicator: () => ({
    marginTop: '-.4rem',
    userSelect: 'none',
    opacity: 0.5,
  }),
}

export default accordionTitleStyles
