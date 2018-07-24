export default {
  root: ({ props }) => ({
    textAlign: props.textAlign,
    display: 'block',
    ...(props.description && { marginBottom: 0 }),
  }),
}
