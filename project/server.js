
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

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



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log("joe repo"); 
});
