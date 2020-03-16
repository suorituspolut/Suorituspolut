import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'


const NavBar = ({ onChange, value }) => {
  const options = [
    { key: 1, value: 1, text: 'Kurssi kerrallaan' },
    { key: 2, value: 2, text: 'Monta periodia' },
    { key: 3, value: 3, text: 'Histogrammi / kurssi' },
    { key: 4, value: 4, text: 'Histogrammi useammasta kurssista' },
    { key: 5, value: 5, text: 'Pullonkaulakurssit' },
    { key: 6, value: 6, text: 'Venn-diagrammi' },
    { key: 7, value: 7, text: 'Kaikki ekat kurssit' },
  ]

  return (
    <Menu pointing secondary>
      <Menu.Item>
        <Dropdown text="Kurssigraafit" value={value} options={options} onChange={onChange} />
      </Menu.Item>
      <Menu.Item>Suosituskurssit</Menu.Item>
    </Menu>
  )
}

export default NavBar
