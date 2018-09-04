export interface IStateDefinition {
  /** The color of the indicator circle */
  indicatorColor: string
  /** The name of icon inside the circle, if present  */
  iconName?: string
  /** The color of icon inside the circle, if present */
  iconColor?: string
  /** the color of border around the circle */
  borderColor: string
}

export type StatusIndicatorStates = { [name: string]: IStateDefinition }

export default (): StatusIndicatorStates => ({
  Available: {
    indicatorColor: 'green',
    iconName: 'check',
    iconColor: 'white',
    borderColor: 'white',
  },
  Away: {
    indicatorColor: 'yellow',
    iconName: 'clock',
    iconColor: 'white',
    borderColor: 'white',
  },
  BeRightBack: {
    indicatorColor: 'yellow',
    iconName: 'clock',
    iconColor: 'white',
    borderColor: 'white',
  },
  Busy: {
    indicatorColor: 'red',
    borderColor: 'white',
  },
  DoNotDisturb: {
    indicatorColor: 'red',
    iconName: 'minus',
    iconColor: 'white',
    borderColor: 'white',
  },
  Offline: {
    indicatorColor: 'grey',
    borderColor: 'white',
  },
  PresenceUnknown: {
    indicatorColor: 'grey',
    borderColor: 'white',
  },
})
