import PopupContent from '../../../../components/Popup/PopupContent'

const menuButtonStyles = {
  root: () => ({
    boxSizing: 'border-box',
    display: 'inline-block',
  }),
  popupContent: () => ({
    [`& .${PopupContent.slotClassNames.content}`]: {
      padding: '0px',
    },
    borderWidth: '0px',
  }),
}

export default menuButtonStyles
