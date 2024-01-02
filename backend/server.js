const express = require('express');
const lumie = require('lumie');
const path = require('path');
const cors = require('cors');
const app = express();
const apiApp = express();
const apiPort = 3000; 

app.get('/', (req, res) => {
  res.send('Main Application is running on port 8080');
});

apiApp.get('/api/health', (req, res) => {
  res.send('API is running on port 3000');
});

app.use(express.json());
let corsOptions;
corsOptions = {
  origin: '*',
  allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

lumie.load(app, {
  preURL: 'api',
  verbose: true,
  ignore: ['*.spec', '*.action', 'helper'],
  controllers_path: path.join(__dirname, 'src/controllers'),
});

apiApp.listen(apiPort, () => {
  console.log(`API is running on port ${apiPort}`);
});
