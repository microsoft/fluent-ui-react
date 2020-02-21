import { placements } from '@popperjs/core'

// Popper.js does not work with JSDOM: https://github.com/FezVrasta/popper.js/issues/478
export default class Popper {
  static placements = placements

  constructor() {
    return {
      destroy: () => {},
      scheduleUpdate: () => {},
      enableEventListeners: () => {},
    }
  }
}
