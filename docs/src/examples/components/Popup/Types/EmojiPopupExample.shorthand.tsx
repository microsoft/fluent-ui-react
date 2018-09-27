import React from 'react'
import { Button, Popup, Grid, Image, Input } from '@stardust-ui/react'

const imageStyle = {
  padding: '5px',
}

const images = [
  <Image styles={imageStyle} key="ade" fluid src="public/images/avatar/large/ade.jpg" />,
  <Image styles={imageStyle} key="chris" fluid src="public/images/avatar/large/chris.jpg" />,
  <Image
    styles={imageStyle}
    key="christian"
    fluid
    src="public/images/avatar/large/christian.jpg"
  />,
  <Image styles={imageStyle} key="daniel" fluid src="public/images/avatar/large/daniel.jpg" />,
  <Image styles={imageStyle} key="elliot" fluid src="public/images/avatar/large/elliot.jpg" />,
  <Image styles={imageStyle} key="elyse" fluid src="public/images/avatar/large/elyse.png" />,
  <Image styles={imageStyle} key="helen" fluid src="public/images/avatar/large/helen.jpg" />,
  <Image styles={imageStyle} key="jenny" fluid src="public/images/avatar/large/jenny.jpg" />,
  <Image styles={imageStyle} key="joe" fluid src="public/images/avatar/large/joe.jpg" />,
  <Image styles={imageStyle} key="justen" fluid src="public/images/avatar/large/justen.jpg" />,
  <Image styles={imageStyle} key="kristy" fluid src="public/images/avatar/large/kristy.png" />,
  <Image styles={imageStyle} key="laura" fluid src="public/images/avatar/large/laura.jpg" />,
  <Image styles={imageStyle} key="matt" fluid src="public/images/avatar/large/matt.jpg" />,
  <Image styles={imageStyle} key="matthew" fluid src="public/images/avatar/large/matthew.png" />,
  <Image styles={imageStyle} key="molly" fluid src="public/images/avatar/large/molly.png" />,
  <Image styles={imageStyle} key="nan" fluid src="public/images/avatar/large/nan.jpg" />,
  <Image styles={imageStyle} key="nom" fluid src="public/images/avatar/large/nom.jpg" />,
  <Image styles={imageStyle} key="patrick" fluid src="public/images/avatar/large/patrick.png" />,
  <Image styles={imageStyle} key="rachel" fluid src="public/images/avatar/large/rachel.png" />,
  <Image styles={imageStyle} key="steve" fluid src="public/images/avatar/large/steve.jpg" />,
  <Image styles={imageStyle} key="stevie" fluid src="public/images/avatar/large/stevie.jpg" />,
  <Image styles={imageStyle} key="tom" fluid src="public/images/avatar/large/tom.jpg" />,
  <Image styles={imageStyle} key="veronika" fluid src="public/images/avatar/large/veronika.jpg" />,
]

const EmojiPopup = () => (
  <Popup
    position="below"
    trigger={<Button icon="smile" />}
    content={
      <div>
        {<Input styles={{ marginBottom: '5px' }} fluid icon="search" placeholder="Search..." />}
        {<br />}
        {<Grid styles={{ width: '300px' }} columns="5" content={images} />}
      </div>
    }
  />
)

export default EmojiPopup
