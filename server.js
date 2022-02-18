const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;
server.set('view engine', 'ejs');
server.use(express.static('Assets'));
server.set('views', 'View');

server.listen(PORT, console.log(`Server started on port ${PORT}`));

server.get("/", (req, res) => {
    res.render('home');
})