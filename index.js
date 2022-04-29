const express = require('express');
const routerApi = require('./routers/index');
const cors = require('cors');
const logger = require('./libs/winston.createLogger');

const {
	errorHandler,
	boomErrorHandler,
	sequelizeErrorHandler,
} = require('./middlewares/error.handles');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = [];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(boom.unauthorized());
		}
	},
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.send('Inicio deStore');
});

routerApi(app);

//Middleswares manejo de errores
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
	logger.info('Corriendo');
});
