const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const { registerRoutes } = require("./routes");
var path = require("path");

require('dotenv').config()


swaggerDocument = require("./swagger.json");

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.get("/*", express.static(path.resolve(__dirname, "./frontend")));
app.use(express.json({limit: "1000mb", extended: true}))

app.use('/content', express.static('content'));
registerRoutes({ router: app })
// app.get('/', (req, res) => {
//     res.send(`<h1>API Works !!!</h1>`)
// });
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );


app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})