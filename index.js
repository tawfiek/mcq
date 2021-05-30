import express from  'express';
import path from 'path';
import logger from 'morgan'
import initRoutes from './src/routes';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(helmet())

initRoutes(app);


// Make a new server
const server = http.createServer(app);
// Get the port from environment variables
const PORT = process.env['NODE_PORT'] ? process.env['NODE_PORT'] : 3000;


server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
