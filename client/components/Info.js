import React from 'react'
import { Icon, Message, Popup, Button } from 'semantic-ui-react'

const Info = ({ content }) => (
    <div>
        <Popup content={content}
            position="bottom left" on='click'
            positionFixed="false"
            size="huge"
            offset="50"
            pinned trigger={<Icon name='question circle outline icon' size='large' />} wide />
    </div>
)


export default Info
