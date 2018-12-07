export function initKeyboardFocusMock() {
  jest.mock('what-input', () => {
    return {
      default: {
        ask: jest.fn(),
      },
    }
  })
}
