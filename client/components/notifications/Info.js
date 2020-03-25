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
      trigger={<Icon className="question circle outline" size="large" />}
      pinned
      wide
    />
  </div>
)


export default Info
