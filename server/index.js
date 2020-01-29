const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
var client  = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
})

var sess = {
  store: new RedisStore({ client }),
  secret: 'secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
 // ttl: 20, // in seconds
  cookie: { maxAge: 20000 },
  unset: 'destroy'
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))

app.use(session(sess))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password || username !== 'matt' || password !== 'secret')
    return res.status(403).send({ error: true, msg: 'credentials incorrect' })

  req.session.username = username
  res.send({ success: true, msg: 'logged' })
})

app.get('/secured', (req, res) => {
  if (!req.session.username)
    return res.status(403).send({ error: true, msg: 'need to login before' })

  const { username } = req.session

  return res.send({ username, email: 'matt@test.com' })
})

app.get('/logout', (req,res) => {
  req.session.destroy((err) => {
    if(err){
      res.send({ error: true })
    } else {
      res.send({ success: true })
    }
  })
})

app.get('/sessions', (req, res) => {
  var store = req.sessionStore
  store.all((error, sessions) => {
    res.send(sessions)
  })
})

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})
