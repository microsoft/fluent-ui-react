export function initKeyboardFocusMock() {
  jest.mock('src/lib/whatInput', () => {
    return {
      ask: jest.fn(),
      setInput: jest.fn(),
    }
  })
}
