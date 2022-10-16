const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const mongoose = require('mongoose')
const mySecret = process.env['DB_CONNECTION']
const newData = require('./schema.js')
const newKey = require('./key.js')
const mySecretKey = process.env['KEY']
const bodyParser = require('body-parser')
const ejs = require('ejs')

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
 
})


  // posting data to mongodb
 app.post('/data', (req, res) => {
  
  res.sendFile(path.join(__dirname, '/public/data.html'));
  console.log(req.body)
   
  let data = new newData ({
    username: req.body.username,
    isproxy: req.body.isproxy,
    issue: req.body.issue,
    communitycheck: req.body.communitycheck,
    usedgoogle: req.body.usedgoogle
  }) 

   
// checking to see if user actually put discord username & tag
if (req.body.username.includes('#')) {
   data.save()
  console.log('posted data to mongodb')
}
else {
  console.log('invalid discord username')
res.writeHead(200, {"Content-Type": "text/html"});
  res.write('<h1>404 error. Please make sure you properly wrote your discord tag and/or answered all of the questions completely. </h1>' + '<style>body{background-color: #191724;} h1 {text-align: center;top: 50%;font-family:"Poppins", sans-serif;color: #FFF;} .button-container {display: flex;justify-content: center;align-items: center; }</style>')
  res.end()

}

})


mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log('Connected to DB!')
})



app.listen(port)
console.log('server connected to ' + port)