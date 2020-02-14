//var dataset = require('@root/client/data/anon_dataset.csv')
//const { ApplicationError } = require('@util/customErrors')
const datahandler = require('@root/server/datahandling/dataHandler')



const getAll = async (req, res) => {
  var fs = require('fs');
  console.log(process.cwd())
  var data = fs.readFileSync(process.cwd() + '/client/data/anon_dataset.csv', 'utf8');
  console.log(data);
  res.send(data)
}


const test = async (req, res) => {
  console.log(datahandler)
  res.send(datahandler)
}



module.exports = {
  getAll,
  test,
}
