const dotenv = require('dotenv').config(),
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  cors = require('cors'),
  app = express();

// seed();

(async function () {
  /**
   * Connect to the database
   */
  const LOCAL_URL = 'mongodb://localhost:27017/appointment';
  const URL =
    'mongodb+srv://lawyerExpertUser:lawyerExpertUserPass@2021@cluster0.xrtgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

  /**
   * Add middlewares
   */
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static('public'));
  app.use(fileUpload());

  /**
   * Add API routes
   */
  app.use('', require('./routes/mainRoutes'));

  /**
   * Start Express!
   */
  const port = process.env.PORT || 5000;
  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
})();
