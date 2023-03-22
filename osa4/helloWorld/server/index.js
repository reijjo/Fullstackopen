const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')
const logger = require('./utils/logger')

// const server = http.createServer(app)

app.listen(config.PORT, () => {
	logger.info(`Server on port ${config.PORT}`)
})