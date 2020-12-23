const http = require('http')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = require('./routes/app')
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
