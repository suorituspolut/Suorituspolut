import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'

const Info = ({ content }) => (
  <div>
    <Popup
      className="info-box"
      content={content}
      position="bottom left"
      on="click"
      positionFixed="false"
      offset="50"
      trigger={<Icon name="question circle outline icon" size="large" />}
      pinned
      wide
    />
  </div>
)


export default Info
