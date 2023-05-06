const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const { registerRoutes } = require("./routes");

require('dotenv').config()

const taskController = require('./controller/task.controller')

swaggerDocument = require("./swagger.json");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
registerRoutes({ router: app })
app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );


app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})