
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;


// Use body-parser middleware (built-in JSON parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'Front End' directory
const frontEndPath = path.join(__dirname, 'Front_End/');
app.use(express.static(frontEndPath));

// Define a route for the root
app.get('/', (req, res) => {
  const indexPath = path.join(frontEndPath, 'index.html');
  res.sendFile(indexPath);
});

app.get('/model/main', (req, res) => {
  const simPath = path.join(frontEndPath, 'simulation.html');
  res.sendFile(simPath);
});

app.get('/feedback', (req, res) => {
  const feedPath = path.join(frontEndPath, 'feedback.html');
  res.sendFile(feedPath);
});


// Connect to MongoDB
mongoose.connect('mongodb+srv://yamminekarl:Karl@cluster0.cbkpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for MongoDB items
const itemSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);



app.get('/items', async (req, res) => {
  try {
      const items = await Item.find(); // Fetch all items from MongoDB
      res.json(items); // Return items as JSON
  } catch (error) {
      res.status(500).send('Error retrieving items from database');
  }
})


app.post('/feedback', async (req, res) => {
  const {content } = req.body; // Get name and content from query params
  try {
      const newItem = new Item({ content });
      await newItem.save(); // Save the new item to the database
      res.send('Item added successfully');

  } catch (error) {
      res.status(500).send('Error adding item');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log("joe repo"); 
});

 
