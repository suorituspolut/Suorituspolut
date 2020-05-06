/* eslint-disable no-multi-str */

const infos = [
  {
    id: 'simplesankey',
    text: {
      what: 'Näyttää sen, mitä kursseja valitun kurssin suorittaneet opiskelijat ovat käyneet seuraavassa periodissa.',
      options: 'Hakua voi rajata sen kurssin perusteella,\
      jonka jälkeisiä suorituksia tarkastellaan, kyseisen kurssin suoritusvuoden \
      sekä kyseisen kurssin arvosanan perusteella.',
      usage: '',
      how: '',
      other: 'Hylätyissä arvosanoissa on mukana kaikki, jotka ovat jättäneet kurssin kesken, \
      saaneet siitä arvosanan 0 tai Hyl. tai vaihtoehtoisesti eivät ole saapuneet tenttiin ollenkaan.',
    },
  },
  {
    id: 'multisankey',
    text: {
      what: 'Näyttää opintojen etenemisen periodeittain kunkin opiskelijan ensimmäisistä kursseista lähtien.',
      options: 'Hakua voi rajata ensimmäisen suorituksen vuoden ja arvosanan perusteella, \
      sekä näytettävien periodien määrän mukaan.',
      usage: '',
      how: 'Kultakin opiskelijalta määritetään ensin periodi, jossa he ovat suorittaneet ensimmäisen kurssinsa. \
      Tämän jälkeen, katsotaan mitä kursseja he ovat käyneet kyseistä periodia seuraavissa periodeissa. \
      Näistä muodostuu diagrammin tasot.',
      other: 'Diagrammi näyttää tällä hetkellä vain TKT:n pääaineopiskelijat. \
      Kurssihausta on rajattu pois ne kurssit, joilla on kaikkiaan alle 20 suoritusta. \
      Mukana on myös kesäperiodi, eli 5. periodi.',
    },
  },
  {
    id: 'simplehistogram',
    text: {
      what: 'Näyttää, missä vaiheessa opintojaan opiskelijat käyvät valitun kurssin.',
      options: 'Hakua voi rajata kurssin sekä näytettävien opiskeluvuosien perusteella.',
      usage: 'Esimerkiksi halutaan tarkastella, missä vaiheessa opintoja kurssi \
      "Ohjelmoinnin perusteet" yleensä käydään.\
      Kaaviosta ilmenee, että suurin osa opiskelijoista käy sen aloitusvuotensa 1. periodissa.',
      how: 'Kaikilta opiskelijoilta määritetään ensin heidän ensimmäisen suorituksensa periodi. \
      Tästä muodostetaan 1.vuosi / 1. periodi, \
      ja loput periodit ovat suhteessa kunkin opiskelijan ensimmäiseen periodiin.',
      other: 'Kurssihausta on rajattu pois ne kurssit, joilla on kaikkiaan alle 20 suoritusta. \
      Mukana on myös kesäperiodi, eli 5. periodi.',
    },
  },
  {
    id: 'multihistogram',
    text: {
      what: 'Näyttää useiden kurssien osalta, missä vaiheessa opintojaan opiskelijat käyvät kyseiset kurssit.',
      options: 'Hakua voi rajata koskemaan kandivaiheen pakollisia TKT-kursseja, \
      kaikki TKT-kursseja tai matematiikan kursseja. \
      Kurssien järjestystä on mahdollista muuttaa keskihajonnan \
      (kuinka keskittyneesti tai hajautuneesti suoritukset ovat) \
      sekä moodin (onko suurin osa suorituksista opintojen alku- vai loppuvaiheilla) perusteella.',
      usage: '',
      how: 'Kaikilta opiskelijoilta määritetään ensin heidän ensimmäisen suorituksensa periodi. \
      Tästä muodostetaan 1.vuosi / 1. periodi, \
      ja loput periodit ovat suhteessa kunkin opiskelijan ensimmäiseen periodiin.',
      other: 'Kurssihausta on rajattu pois ne kurssit, joilla on kaikkiaan alle 20 suoritusta. \
      Mukana on myös kesäperiodi, eli 5. periodi.',
    },
  },
  {
    id: 'bubbles',
    text: {
      what: 'Näyttää sen, missä periodissa kurssit on suoritettu minäkin vuonna. ',
      options: 'Hakua voi rajata suoritusvuoden sekä suoritusten arvosanan perusteella.  \
      Lisäksi on mahdollista määrittää, kuinka monta erillistä kurssia näytetään per periodi. Loput kurssit niputetaan \
      kategoriaan "Muut"',
      usage: '',
      how: '',
      other: 'Periodin klikkaaminen piilottaa kyseisen periodin kurssisuoritukset.',
    },
  },
  {
    id: 'recommendationGrades',
    text: {
      what: 'Näyttää valitun kurssin arvosanajakauman haluttuna vuonna, sekä kurssit, \
      joita on käyty ennen valittua kurssia.',
      options: 'Mukaan voi valita kaikkia tutkinto-ohjelmia suorittavat, tai vaihtoehtoisesti \
      vain matematiikan tai tietojenkäsittelytieteen pääaineopiskelijat. \
      Suorituksista on lisäksi mahdollista valita kunkin opiskelijan \
      paras suoritus tai kaikki kyseisen vuoden suoritukset.',
      usage: 'Valitaan esimerkiksi vuosi 2017 ja kurssi "Tietorakenteet ja algoritmit". \
      Arvosanajakauma on lähtökohtaisesti opiskelijan paras suoritus ko. kurssista vuonna 2017. \
      Taulukko taas näyttää kurssin "Tietorakenteet ja algoritmit" käyneiden osalta,\
      kuinka suuri osuus heistä on suorittanut eri kursseja ennen "Tietorakenteet ja algoritmit" -kurssia. \
      Jaottelu taulukossa on tehty kurssin "Tietorakenteet ja algoritmit" arvosanojen perusteella.',
      how: 'Taulukkoon lasketaan ensin 10 yleisintä kurssia, joita on käyty ennen valittua kurssia. \
      Jakaumat eri arvosanojen perusteella lasketaan sen jälkeen näille saadulle 10 kurssille. ',
      other: 'Kurssi on aiemmin suoritettu, jos se on tehty vähintään edellisessä periodissa. \
      Samassa periodissa tehtyjä kursseja ei ole otettu huomioon. \
      Kurssihausta on rajattu pois ne kurssit, joilla on kautta aikojen alle 20 suoritusta. ',
    },
  },
  {
    id: 'recommendationTime',
    text: {
      what: 'Tähän kurssinsuositteluun voi antaa käyttäjätiedot suoritetuista kursseista, \
      joiden perusteella sovellus suosittelee kursseja haluttuun periodiin.',
      options: '',
      usage: '',
      how: '',
      other: '',
    },
  },
]

export default infos
