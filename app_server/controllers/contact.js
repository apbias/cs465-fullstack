const fs = require('fs');
const contacts = JSON.parse(fs.readFileSync('./data/contact.json', 'utf8'));

/* Get contact view */
const contact = (req, res) => {
    res.render('contact', { title: 'Contact - Travlr Getaways', ...contacts });
    };

module.exports = { contact };