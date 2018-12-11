export function initKeyboardFocusMock() {
  jest.mock('src/lib/whatInput', () => {
    return {
      default: {
        ask: jest.fn(),
        setInput: jest.fn(),
      },
    }
  })
}
