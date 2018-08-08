const accordionContentStyles = {
  root: ({ props }) => ({
    display: 'none',
    verticalAlign: 'middle',
    ...(props.active && { display: 'block' }),
  }),
}

export default accordionContentStyles
