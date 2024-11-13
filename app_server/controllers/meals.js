const fs = require('fs');
const meal = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

/* Get rooms view */
const meals = (req, res) => {
    res.render('meals', { title: 'Meals - Travlr Getaways', ...meal });
    };

module.exports = { meals };