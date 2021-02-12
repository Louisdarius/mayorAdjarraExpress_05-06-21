const dotenv       = require('dotenv').config(),
      express      = require('express'),
      mongoose     = require('mongoose'),
      bodyParser   = require('body-parser'),
      RoleRouter   = require('./routes/roleRoutes'),
      app          = express();

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
          app.use('/', RoleRouter);
    // app.use('/api/practices', require('./api/practices'));
    // app.use('/api/patients', require('./api/patients'));
  
    /**
     * Start Express!
     */
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on http://localhost:${process.env.PORT}`)
    );
  })();

  



