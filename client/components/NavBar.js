import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import Logo from '../assets/logo.png'

const NavBar = ({ onChange, value }) => {
  const options = [
    { key: 1, value: 1, text: 'Sankey (kurssien suorituspolut periodeittain)' },
    { key: 2, value: 2, text: 'Sankey (kurssien suorituspolut periodeittain, toinen periodi)' },
<<<<<<< HEAD
    { key: 3, value: 3, text: 'Sankey (kurssien suorituspolut periodeittain, aloituskurssit)' },
    { key: 4, value: 4, text: 'Histogrammi (kurssin suoritusajankohta)' },
    { key: 5, value: 5, text: 'Histogrammi (useamman kurssin suoritusajankohta)' },
    { key: 6, value: 6, text: 'Kuplagraafi (listaus kursseista periodeittain)' },
    { key: 7, value: 7, text: 'Pullonkaulakurssit (hahmotelma)' },
    { key: 8, value: 8, text: 'Venn-diagrammi (hahmotelma)' },
=======
    { key: 6, value: 6, text: 'Sankey (kurssien suorituspolut periodeittain, aloituskurssit)' },
    { key: 3, value: 3, text: 'Histogrammi (kurssin suoritusajankohta)' },
    { key: 7, value: 7, text: 'Kuplagraafi (listaus kursseista periodeittain)' },
    { key: 4, value: 4, text: 'Pullonkaulakurssit (hahmotelma)' },
    { key: 5, value: 5, text: 'Venn-diagrammi (hahmotelma)' },
>>>>>>> e88d6eb84097e847c28b5a8ab88f891a650992de
  ]

  return (
    <Menu pointing secondary>
      <Menu.Item>
        <img alt="" className="navbar-logo" src={Logo} />
      </Menu.Item>
      <Menu.Item className="navbar-item">
        <Dropdown text="Kurssigraafit" value={value} options={options} onChange={onChange} />
      </Menu.Item>
      <Menu.Item className="navbar-item">Suosituskurssit</Menu.Item>
    </Menu>
  )
}

export default NavBar
