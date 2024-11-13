const fs = require('fs');
const mainPage = JSON.parse(fs.readFileSync('./data/index.json', 'utf8'));

/* GET Homepage */
const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways', ...mainPage });    
};

module.exports = { index };