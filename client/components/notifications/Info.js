/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { Icon, Popup, Container } from 'semantic-ui-react'


const text = (content) => {
  return (
    <Container text>
      {content.what ? <p><b>Mitä kuvaa: </b>{content.what}</p> : null}
      {content.options ? <p><b>Haun rajaus: </b>{content.options}</p> : null}
      {content.usage ? <p><b>Käyttötapausesimerkki: </b>{content.usage}</p> : null}
      {content.how ? <p><b>Miten tiedot on laskettu: </b>{content.how}</p> : null}
      {content.other ? <p><b>Muuta: </b>{content.other}</p> : null}
    </Container>
  )
}

const Info = ({ content }) => (
  <React.Fragment>
    <Popup
      className="info-box"
      content={text(content)}
      position="bottom left"
      on="click"
      positionfixed="false"
      offset="50"
      trigger={<Icon className="question circle outline" size="large" />}
      pinned="true"
      wide
    />
  </React.Fragment>
)


export default Info
