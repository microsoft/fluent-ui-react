export interface IAvatar2Variables {
  presenceIndicatorBackground: string
  avatarSize: string
  avatarType: string
  avatarState: string
  presenceStates: any
  avatarClippingData: any
  avatarSizes: any
}

//
// Shouldn't this format/interface for this be defined in the src?
// size is the visual size
// actual size is the size of the svg which includes a buffer for visual alignment
//
export const avatarSizes = {
  xsmall: {
    size: 20,
    actualSize: 24,
  },
  small: {
    size: 28,
    actualSize: 32,
  },
  medium: {
    size: 32,
    actualSize: 36,
  },
  large: {
    size: 42,
    actualSize: 48,
  },
  xlarge: {
    size: 64,
    actualSize: 72,
  },
  xxlarge: {
    size: 128,
    actualSize: 144,
  },
}

//
// Shouldn't this format/interface for this be defined in the src
// so that the Avatar implementation is relying on established variables?
// avatarPaths contains the paths data for clipping the avatar
//
export const avatarClippingData = {
  person: {
    xsmall: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
    },
    small: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
    medium: {
      avatarClip:
        'M22,29c0-3.9,3.1-7,7-7c1.5,0,2.9,0.5,4.1,1.3c0.6-1.7,0.9-3.4,0.9-5.3c0-8.8-7.2-16-16-16S2,9.2,2,18s7.2,16,16,16c1.9,0,3.7-0.3,5.3-0.9C22.5,31.9,22,30.5,22,29z',
      avatarClipNoStatus:
        'M34,18c0,8.8-7.2,16-16,16S2,26.8,2,18c0-4.2,1.6-8,4.2-10.8C9.1,4,13.3,2,18,2C26.8,2,34,9.2,34,18z',
      statusPath:
        'M34,29c0,2.8-2.2,5-5,5s-5-2.2-5-5c0-1.4,0.6-2.6,1.5-3.5c0.9-0.9,2.2-1.5,3.5-1.5C31.8,24,34,26.2,34,29z',
    },
    large: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
    xlarge: {
      avatarClip:
        'M48,60c0-6.6,5.4-12,12-12c1.8,0,3.6,0.4,5.2,1.2C67,45.2,68,40.7,68,36C68,18.3,53.7,4,36,4S4,18.3,4,36c0,17.7,14.3,32,32,32c4.7,0,9.2-1,13.2-2.8C48.4,63.6,48,61.8,48,60z',
      avatarClipNoStatus:
        'M68,36c0,17.7-14.3,32-32,32S4,53.7,4,36c0-9.3,4-17.6,10.3-23.5C20,7.2,27.6,4,36,4C53.7,4,68,18.3,68,36z',
      statusPath:
        'M68,60c0,4.4-3.6,8-8,8s-8-3.6-8-8c0-2.4,1.1-4.6,2.8-6.1C56.2,52.7,58,52,60,52C64.4,52,68,55.6,68,60z',
    },
    xxlarge: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
  },
  team: {
    xsmall: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
    },
    small: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
    medium: {
      avatarClip:
        'M31,34H5c-1.7,0-3-1.3-3-3V5c0-1.7,1.3-3,3-3h26c1.7,0,3,1.3,3,3v26C34,32.7,32.7,34,31,34z',
      avatarClipNoStatus:
        'M22,29c0-3.9,3.1-7,7-7c2,0,3.7,0.8,5,2.1V5c0-1.7-1.3-3-3-3H5C3.3,2,2,3.3,2,5v26c0,1.6,1.3,3,3,3h19.1C22.8,32.7,22,31,22,29z',
      statusPath:
        'M34,29c0,2.8-2.2,5-5,5s-5-2.2-5-5c0-1.4,0.6-2.6,1.5-3.5c0.9-0.9,2.2-1.5,3.5-1.5C31.8,24,34,26.2,34,29z',
    },
    large: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
    xlarge: {
      avatarClip:
        'M48,60c0-6.6,5.4-12,12-12c3.1,0,5.9,1.2,8,3.1V10c0-3.3-2.7-6-6-6H10c-3.3,0-6,2.7-6,6v52c0,3.3,2.7,6,6,6h41.1C49.2,65.9,48,63.1,48,60z',
      avatarClipNoStatus:
        'M62,68H10c-3.3,0-6-2.7-6-6V10c0-3.3,2.7-6,6-6h52c3.3,0,6,2.7,6,6v52C68,65.3,65.3,68,62,68z',
      statusPath:
        'M34,29c0,2.8-2.2,5-5,5s-5-2.2-5-5c0-1.4,0.6-2.6,1.5-3.5c0.9-0.9,2.2-1.5,3.5-1.5C31.8,24,34,26.2,34,29z',
    },
    xxlarge: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
  },
  bot: {
    xsmall: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
    },
    small: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
    medium: {
      avatarClip:
        'M22,29c0-3.9,3.1-7,7-7c1.6,0,3.1,0.6,4.3,1.5l2.3-3.9c0.6-1,0.6-2.2,0-3.2L28.2,3.6c-0.6-1-1.6-1.6-2.8-1.6H10.6C9.5,2,8.4,2.6,7.8,3.6L0.4,16.4c-0.6,1-0.6,2.2,0,3.2l7.4,12.8c0.6,1,1.6,1.6,2.8,1.6h13.5C22.8,32.7,22,31,22,29z',
      avatarClipNoStatus:
        'M25.4,2H10.6C9.5,2,8.4,2.6,7.8,3.6L0.4,16.4c-0.6,1-0.6,2.2,0,3.2l7.4,12.8c0.6,1,1.6,1.6,2.8,1.6h14.8c1.1,0,2.2-0.6,2.8-1.6l7.4-12.8c0.6-1,0.6-2.2,0-3.2L28.2,3.6C27.6,2.6,26.5,2,25.4,2z',
      statusPath:
        'M34,29c0,2.8-2.2,5-5,5s-5-2.2-5-5c0-1.4,0.6-2.6,1.5-3.5c0.9-0.9,2.2-1.5,3.5-1.5C31.8,24,34,26.2,34,29z',
    },
    large: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
    xlarge: {
      avatarClip:
        'M48,60c0-6.6,5.4-12,12-12c1.9,0,3.7,0.5,5.3,1.3l5.8-10.1c1.2-2,1.2-4.4,0-6.4L56.3,7.2c-1.2-2-3.3-3.2-5.6-3.2H21.2c-2.3,0-4.4,1.2-5.6,3.2L0.9,32.8c-1.2,2-1.2,4.4,0,6.4l14.8,25.6c1.2,2,3.3,3.2,5.6,3.2h29.6c0.1,0,0.2,0,0.3,0C49.2,65.9,48,63.1,48,60z',
      avatarClipNoStatus:
        'M50.8,4H21.2c-2.3,0-4.4,1.2-5.6,3.2L0.9,32.8c-1.2,2-1.2,4.4,0,6.4l14.8,25.6c1.2,2,3.3,3.2,5.6,3.2h29.6c2.3,0,4.4-1.2,5.6-3.2l14.8-25.6c1.2-2,1.2-4.4,0-6.4L56.3,7.2C55.2,5.2,53.1,4,50.8,4z',
      statusPath:
        'M34,29c0,2.8-2.2,5-5,5s-5-2.2-5-5c0-1.4,0.6-2.6,1.5-3.5c0.9-0.9,2.2-1.5,3.5-1.5C31.8,24,34,26.2,34,29z',
    },
    xxlarge: {
      avatarClip: 'a',
      avatarClipNoStatus: 'a',
      statusPath: 'a',
    },
  },
}

//
// Presence States should also correspond to business logic..?
//
export const presenceStates = {
  available: {
    icon: 'check',
    color: 'green',
  },
  busy: {
    icon: '',
    color: 'red',
  },
  doNotDisturb: {
    icon: 'minus',
    color: 'red',
  },
  away: {
    icon: 'clock',
    color: 'yellow',
  },
  beRightBack: {
    icon: 'clock',
    color: 'yellow',
  },
  offline: {
    icon: '',
    color: 'grey',
  },
  unknown: {
    icon: '',
    color: 'grey',
  },
}

export default (siteVariables): IAvatar2Variables => {
  return {
    presenceIndicatorBackground: 'transparent',
    avatarSize: 'medium',
    avatarType: 'person',
    avatarState: 'unknown',
    avatarSizes,
    avatarClippingData,
    presenceStates,
  }
}
