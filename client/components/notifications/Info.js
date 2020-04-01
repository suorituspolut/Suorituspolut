import React from 'react'
import { Icon, Popup,Container } from 'semantic-ui-react'

const Info = ({ content }) => (
  
    <Popup
      className="info-box"
      
      content={<Container text>{content}</Container>}
       
      position="bottom left"
      on="click"
      offset="50"
      trigger={<Icon className="question circle outline" size="large" />}
      wide
      
    />
 
)


export default Info
