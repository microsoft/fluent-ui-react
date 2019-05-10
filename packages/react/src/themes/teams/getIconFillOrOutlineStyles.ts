import { teamsIconClassNames } from './components/Icon/svg'

const getIconFillOrOutlineStyles = ({ outline }: { outline: boolean }): React.CSSProperties => ({
  [`& .${teamsIconClassNames.filled}`]: {
    display: outline ? 'none' : 'block',
  },

  [`& .${teamsIconClassNames.outline}`]: {
    display: outline ? 'block' : 'none',
  },
})

export default getIconFillOrOutlineStyles
