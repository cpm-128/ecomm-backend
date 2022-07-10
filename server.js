const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware so express knows how to handle incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// force: true resyncs the connections and tables recreated
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`>> App listening on port ${PORT}!`);
  })
});