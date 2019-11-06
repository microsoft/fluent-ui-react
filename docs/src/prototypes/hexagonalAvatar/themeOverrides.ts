import hexClipPath from './hexClipPath'

const themeOverrides = {
  siteVariables: {
    hexClipPath,
  },
  componentStyles: {
    Avatar: {
      root: ({ variables: v }) => ({
        width: v.width,
        height: v.height,
      }),
      image: ({ variables: v }) => ({
        clipPath: v.clipPath,
        borderRadius: v.borderRadius,
      }),
      label: ({ variables: v }) => ({
        width: v.width,
        height: v.height,
        clipPath: v.clipPath,
        borderRadius: v.borderRadius,
      }),
    },
  },
}

export default themeOverrides
