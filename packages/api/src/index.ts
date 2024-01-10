import express from 'express';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(router);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
