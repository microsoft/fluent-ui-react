import * as React from 'react'
import { Image } from '@fluentui/react'

const ImageExample = () => (
  <>
    {/* Wrong default props */}
    {/* <Image src="public/images/wireframe/square-image.png" to="Foo" /> */}
    {/* <Image src="public/images/wireframe/square-image.png" type="Foo" /> */}

    {/* Wrong elements */}
    {/* <Image as='aa' src="public/images/wireframe/square-image.png" /> */}
    {/* <Image as='blockq' src="public/images/wireframe/square-image.png" /> */}

    {/* Wrong attrs on els */}
    {/* <Image as="button" src="public/images/wireframe/square-image.png" type="Foo" /> */}
    {/* <Image as="a" src="public/images/wireframe/square-image.png" href1="Foo" /> */}
    {/* <Image as="button" src="public/images/wireframe/square-image.png" href="Foo" /> */}
    <Image />
    {/* Wrong attr on components */}
    {/* <Image as={Button} src="public/images/wireframe/square-image.png" type="Foo" /> */}
    {/* <Image as={Button} src="public/images/wireframe/square-image.png" typ="Foo" /> */}
  </>
)

export default ImageExample
