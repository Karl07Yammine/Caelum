
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const frontEndPath = path.join(__dirname, 'Front_End/');
app.use(express.static(frontEndPath));


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



mongoose.connect('mongodb+srv://yamminekarl:Karl@cluster0.cbkpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const itemSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);



app.get('/items', async (req, res) => {
  try {
      const items = await Item.find();
      res.json(items);
  } catch (error) {
      res.status(500).send('Error retrieving items from database');
  }
})


app.post('/feedback', async (req, res) => {
  const {content } = req.body;
  try {
      const newItem = new Item({ content });
      await newItem.save();
      const feedPath = path.join(frontEndPath, 'feedback.html');
    res.sendFile(feedPath);

  } catch (error) {
      res.status(500).send('Error adding item');
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log("joe repo"); 
});

 
