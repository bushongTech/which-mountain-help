const express = require('express');
const app = express();
const path =require('path');
const port = 8080;
//The server running in the background will serve up the assets folder
app.use(express.static(path.join(__dirname, 'assets')));
// Define a route aka '/' is your main page
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'pages', 'index.html'));
});
app.get('/all-mountains.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'pages', 'all-mountains.html'));
});  
app.get('/ikon.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'ikon.html'));
}); 
app.get('/epic.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'epic.html'));
});
app.get('/conditions.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'conditions.html'));
});  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});