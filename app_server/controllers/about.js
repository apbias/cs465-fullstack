const fs = require('fs');
const info = JSON.parse(fs.readFileSync('./data/about.json', 'utf8'));

/* Get about view */
const about = (req, res) => {
    res.render('about', { title: 'About Travlr Getaways', info });
    };

module.exports = { about };