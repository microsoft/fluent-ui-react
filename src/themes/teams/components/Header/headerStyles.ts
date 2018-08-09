export default {
  root: ({ props, variables: v }) => ({
    color: v.color,
    textAlign: props.textAlign,
    display: 'block',
    ...(props.description && { marginBottom: 0 }),
  }),
}
