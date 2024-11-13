const fs = require('fs');
const room = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

/* Get rooms view */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Rooms - Travlr Getaways', room });
    };

module.exports = { rooms };