import React, {useState,useEffect} from 'react'
import NavBar from 'Components/NavBar'
import Footer from 'Components/Footer'
import Router from 'Components/Router'
import Course from 'Components/Course'
import Graph from './Graph'
import {dsv} from 'd3';

var alter = function(e) {
  return e.kur.includes("ongelmanratkaisussa") 
&& e.arv=="5" //use the argument here.)   
  
}

const row = d => {
  //console.log(d)
let taulu = JSON.parse(JSON.stringify(d));
console.log("filtered",  d.filter(alter))
console.log("tyyppi: ",typeof(taulu))
console.log('taulu', taulu)
//JSON.stringify(d.filter(alter))
  return  JSON.stringify(d.filter(alter).
  map(d => d.kur.length))
  //d.filter(alter).toString()
 
  //JSON.stringify(d)

  //JSON.parse(obj): reverse function
};

function load() {
  const [data, setData] = useState();
//  console.log('before data',data)
let whatToShow = data!== undefined
  ?  row(data)
  : "data[1]"
  //console.log(data[0])
  //console.log("dsv: ",dsv('dataset.csv'))

  useEffect(() => {
    dsv(";",'dataset.csv').then(data =>{
      setData(data)
    });
  }, []);

console.log("data", data)

  return (
    <div >
   {whatToShow}
    </div>
  );
}

export default () => (
  <div>
    <Graph />
    {load()}
  </div>
)
