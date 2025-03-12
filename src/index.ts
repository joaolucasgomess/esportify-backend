import 'dotenv/config';
import { AddressInfo } from 'net';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const server = http.createServer(app);

server.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
})
