const app = require('./app')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const DataBase = require('./Config/db-configs')
const users = require('./routes/api/users')
const Users = require('./models/Users')

const port = process.env.PORT || 5000

class Server{
  constructor(port) { 
    this.serverListening = app.listen(port , (err) => {
      if(err){
        console.log(err)
      }
      console.log('Express server listening on port ' + port)
    })
  }

  async Connect() {
    this.db = await mongoose
      .connect(DataBase.mongoURI, { useNewUrlParser: true })
      .then(() => console.log('MongoDB Connected...'))
      .catch(err => console.log(err))
  }

  bodyParser(){
    // using body parser middleware
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use((req, res, next) => {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
    })
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
    let err = new Error('File Not Found')
    err.status = 404
    next(err)
    })

    // error handler
    // define as the last app.use callback
    app.use((err,req, res, next) => {
    res.status(err.status || 500)
    res.send(err.message)
    })
    // Use Routes
    app.use('/api/users', users)

  }
}

let server = new Server(port)
server.Connect()
server.bodyParser()

us = new Users({
  email:"sasdadfam@examasd.com",
  firsName:'mdsm',
  lastName:'ndafn',
  phoneNumber:'1f2565afaa5',
  password:'12345a6aasd7',
  tokens:{
    access:'acvadasdacess',
    token:'asdasfasdadsasvddasd'
  }
})
us.save()