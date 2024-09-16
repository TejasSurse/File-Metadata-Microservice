var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
var path = require('path');
var app = express();

// Configure storage options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'data', 'uploads')); // Path to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Initialize multer with storage options
const upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Use the `upload` middleware in the POST route
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Access file details
  let name = req.file.originalname;
  let file = req.file.mimetype;
  let size = req.file.size;

  res.json({
    name: name,
    type: file,
    size: size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
