import { info } from 'console';
import express, { Request, Response } from 'express';
import mongose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 8080;

const {
  MONGODB_ATLAS_USERNAME,
  MONGODB_ATLAS_PASSWORD,
  MONGODB_ATLAS_DBNAME,
} = process.env;

const uri = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0.mrjvz.mongodb.net/?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('hello there');
});

app.get('/about', (req: Request, res: Response) => {
  res.send('hello there from page about me');
});

mongose.set('useFindAndModify', true);
mongose
  .connect(uri, options)
  .then(() => {
    app.listen(PORT, () => {
      info(`app is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });
