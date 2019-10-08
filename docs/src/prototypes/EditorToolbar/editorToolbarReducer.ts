enum FontFormatting {
  Paragraph,
  Heading1 = 1,
  Heading2 = 2,
  Heading3 = 3,
}

export type EditorToolbarState = {
  bold: boolean
  italic: boolean
  underline: boolean
  //
  fontHighlight: boolean
  fontColor: boolean
  fontSize: boolean
  fontFormatting: FontFormatting
  //
  itemList: boolean
  numberList: boolean
  //
  quote: boolean
  link: boolean
  code: boolean
  table: boolean
  //
  important: boolean
  //
  more: boolean
}

export type EditorToolbarAction =
  | { type: 'BOLD'; value: boolean }
  | { type: 'ITALIC'; value: boolean }
  | { type: 'UNDERLINE'; value: boolean }
  | { type: 'LINK'; value: boolean }
  | { type: 'TABLE'; value: boolean }
  | { type: 'MORE'; value: boolean }

export const initialState: EditorToolbarState = {
  bold: false,
  italic: false,
  underline: false,
  //
  fontHighlight: false,
  fontColor: false,
  fontSize: false,
  fontFormatting: FontFormatting.Paragraph,
  //
  itemList: false,
  numberList: false,
  //
  quote: false,
  link: false,
  code: false,
  table: false,
  //
  important: false,
  //
  more: false,
}

export function editorToolbarReducer(
  state: EditorToolbarState,
  action: EditorToolbarAction,
): EditorToolbarState {
  switch (action.type) {
    case 'BOLD':
      return { ...state, bold: action.value }
    case 'ITALIC':
      return { ...state, italic: action.value }
    case 'UNDERLINE':
      return { ...state, underline: action.value }
    //
    case 'LINK':
      return { ...state, link: action.value }
    case 'TABLE':
      return { ...state, table: action.value }
    //
    case 'MORE':
      return { ...state, more: action.value }
  }

  return state
}
