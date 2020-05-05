import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import Logo from '../../assets/logo.png'

const NavBar = ({ onChange, value }) => {
  const options = [
    { key: 1, value: 1, text: 'Kurssien suorituspolut periodeittain ja kursseittain (Sankey-graafi)' },
    { key: 2, value: 2, text: 'Kurssien suorituspolut periodeittain, useampia periodeja (Sankey-graafi)' },
    { key: 3, value: 3, text: 'Kurssin suoritusajankohta (Histogrammi)' },
    { key: 4, value: 4, text: 'Useamman kurssin suoritusajankohta (Histogrammi)' },
    { key: 5, value: 5, text: 'Listaus kursseista periodeittain (Kuplagraafi)' },
  ]

  const recommendationOptions = [
    { key: 1, value: 8, text: 'Arvosanojen perusteella' },
    { key: 2, value: 9, text: 'Opintojen vaiheen perusteella' },
  ]

  return (
    <Menu pointing secondary>
      <Menu.Item>
        <img alt="" className="navbar-logo" src={Logo} />
      </Menu.Item>
      <Menu.Item className="navbar-item">
        <Dropdown text="Kurssigraafit" value={value} options={options} onChange={onChange} />
      </Menu.Item>
      <Menu.Item className="navbar-item">
        <Dropdown text="Kurssisuositukset" value={value} options={recommendationOptions} onChange={onChange} />
      </Menu.Item>
    </Menu>
  )
}

export default NavBar
