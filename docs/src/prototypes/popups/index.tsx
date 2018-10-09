import * as React from 'react'
import EmojiPopup from './emojiPopup'
import StickerPopup from './stickerPopup'

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '180px', padding: '20px' }}>
    <span>Emojii popup:</span>
    <EmojiPopup />
    <br />
    <span>Sticker popup:</span>
    <StickerPopup />
  </div>
)
