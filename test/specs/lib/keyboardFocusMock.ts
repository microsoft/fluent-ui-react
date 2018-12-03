export function initKeyboardFocusMock() {
  jest.mock('what-input', () => {
    return {
      ask: jest.fn(),
    }
  })
}
