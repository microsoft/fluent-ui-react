import * as styles from './materialUtils'
import { ThemeInput } from 'src/themes/types'

const style = cssStyles => ({
  root: cssStyles,
})

/**
 * Theme object that contains CSS-like objects that define styles for individual components
 */
export default {
  /**
   * Styles defined per component type
   */
  componentStyles: {
    'Dusty(MainContainer)': style({
      backgroundImage: `linear-gradient(#455a64, #90a4ae)`,
    }),

    'Dusty(Navbar)': style(({ props }) => ({
      padding: '25px 0',
      backgroundColor: '#00695C',
      transition: 'all 0.3s',

      ...styles.elevate(15),
      ...(props.scrolling && {
        top: '0px',
        padding: '5px 0',
        ...styles.elevate(5),
      }),
    })),

    'Dusty(Footer)': style({
      boxShadow: [
        `${-3}px ${-3}px ${20}px ${15}px rgba(0, 0, 0, ${styles.shadowKeyUmbraOpacity})`,
      ].join(','),
    }),

    'Dusty(Speaker)': style({
      position: 'relative',
      top: '0px',
      left: '0px',
      ...styles.paper(10),
      ':hover': {
        cursor: 'pointer',
        ...styles.paper(20),
        ...{
          top: '-7px',
          left: '7px',
        },
      },
      transition: 'all 0.2s',
      borderRadius: '10px',
      overflow: 'hidden',
    }),
  },
} as ThemeInput
