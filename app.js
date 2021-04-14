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
    'mongodb+srv://mayorAppointmentUser:mayorAppointmentUser@2021@cluster0.ffhu4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  try {
    await mongoose.connect(URL, {
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
  app.use(cors());
  app.use(express.static('public'));
  app.use(fileUpload());

  /**
   * Add API routes
   */
  app.use('', require('./routes/mainRoutes'));
  app.use('/api/roles', require('./routes/roleRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/appointments', require('./routes/appointmentRoutes'));
  app.use('/api/feedbacks', require('./routes/feedbackRoutes'));
  app.use('/api/feedbackList', require('./routes/feedbackListRoutes'));
  app.use('/api/news', require('./routes/newsListRoutes'));
  app.use('/api/preferences', require('./routes/preferenceListRoutes'));

  /**
   * Start Express!
   */
  const port = process.env.PORT || 5000;
  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
})();
