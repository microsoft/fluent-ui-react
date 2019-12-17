import { IFluentThemeShape, ColorRamp } from './FluentThemeShape';

export const FluentTheme: IFluentThemeShape = {
  colors: {
    brand: new ColorRamp(['#00f9ff', '#008e91', '#003233']),
    neutral: new ColorRamp(['#dedede', '#7c7c7c', '#292929']),
  },
  typography: {
    ramp: [8, 10, 12, 16, 24, 36, 48, 128],
    fontFace: 'Futura',
  },
};

export const FluentButtonTheme = {
  styles: ({ typography, colors }: any) => ({
    root: {
      fontFamily: typography.fontFace,
      fontSize: typography.ramp[5],
      backgroundColor: colors.brand.strongest(),
      color: colors.neutral.weakest(),
    },
  }),
  variants: {
    tiny: {
      true: {
        root: { fontSize: '20%' },
      },
    },
    large: {
      true: {
        root: { fontSize: '400%' },
      },
    },
    size: {
      s: { root: { fontSize: '100%' } },
      m: { root: { fontSize: '200%' } },
      l: { root: { fontSize: '400%' } },
    },
    shadowed: {
      true: { root: { fontSize: '77%', boxShadow: '10px 5px 5px purple' } },
    },
    bigIcon: {
      true: {
        root: { fontSize: '300%' },
        icon: { fontSize: '300%' },
      },
    },
    beautiful: {
      true: props => ({
        // bigIcon: true, size: m, shadowed: false
        root: {
          border: '3px solid pink',
        },
      }),
    },
  },
};

export const PlannerFluentTheme: IFluentThemeShape = {
  colors: {
    brand: new ColorRamp(['#00f9ff', '#008e91', '#003233']),
    neutral: new ColorRamp(['#dedede', '#7c7c7c', '#292929']),
  },
  typography: {
    ramp: [8, 10, 12, 16, 24, 36, 48, 128],
    fontFace: 'Futura',
  },
  components: {
    FluentButton: FluentButtonTheme,
    FluentMenu: {
      styles: () => ({
        root: {
          border: '1px solid red',
          padding: '10px',
        },
      }),
      variants: {
        rounded: {
          true: {
            root: { borderRadius: '10px' },
          },
        },
      },
    },
    FluentMenuItem: {
      styles: () => ({
        root: {
          border: '1px solid blue',
        },
      }),
      variants: {
        rounded: {
          true: {
            root: { borderRadius: '20px' }, // FluentMenu should propagate this prop to the FluentMenuItem...
          },
        },
      },
    },
  },
};
