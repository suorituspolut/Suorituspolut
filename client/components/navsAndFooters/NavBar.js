import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import Logo from '../../assets/logo.png'

const NavBar = ({ onChange, value }) => {
  const options = [
    { key: 'simplesankey', value: 'simplesankey', text: 'Kurssien suorituspolut periodeittain ja kursseittain (Sankey-graafi)' },
    { key: 'multisankey', value: 'multisankey', text: 'Kurssien suorituspolut periodeittain, useampia periodeja (Sankey-graafi)' },
    { key: 'simplehistogram', value: 'simplehistogram', text: 'Kurssin suoritusajankohta (Histogrammi)' },
    { key: 'multihistogram', value: 'multihistogram', text: 'Useamman kurssin suoritusajankohta (Histogrammi)' },
    { key: 'bubbles', value: 'bubbles', text: 'Listaus kursseista periodeittain (Kuplagraafi)' },
  ]

  const recommendationOptions = [
    { key: 'recommendationGrades', value: 'recommendationGrades', text: 'Arvosanojen perusteella' },
    { key: 'recommendationTime', value: 'recommendationTime', text: 'Opintojen vaiheen perusteella' },
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
