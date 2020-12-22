const PORT = process.env.PORT || 3000
const http = require('http')
const app = require('./routes/app')
const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
