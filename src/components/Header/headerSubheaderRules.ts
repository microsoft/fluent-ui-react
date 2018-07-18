export default {
  root: ({ props: { color, background }, variables: v }) => {
    const subheaderColor = color || v.color
    const subheaderBackground = background || v.background
    return {
      fontSize: v.fontSize,
      fontWeight: v.fontWeight,
      color: subheaderColor,
      background: subheaderBackground,
    }
  },
}
