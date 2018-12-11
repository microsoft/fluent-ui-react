export function initKeyboardFocusMock() {
  jest.mock('./whatInput', () => {
    return {
      ask: jest.fn(),
    }
  })
}
