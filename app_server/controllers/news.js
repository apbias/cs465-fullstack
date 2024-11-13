const fs = require('fs');
const newss = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));

/* Get rooms view */
const news = (req, res) => {
    res.render('news', { title: 'Rooms - Travlr Getaways', ...newss });
    };

module.exports = { news };