import express from 'express';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(router);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
