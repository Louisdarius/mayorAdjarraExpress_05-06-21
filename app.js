const dotenv = require('dotenv').config(),
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  app = express();

// seed();

(async function () {
  /**
   * Connect to the database
   */
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to database!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return;
  }

  /**
   * Add middlewares
   */
  app.use(bodyParser.json());

  /**
   * Add API routes
   */
  app.use('/api/roles', require('./routes/roleRoutes'));

  /**
   * Start Express!
   */
  app.listen(process.env.PORT, () =>
    console.log(`Server listening on http://localhost:${process.env.PORT}`)
  );
})();
