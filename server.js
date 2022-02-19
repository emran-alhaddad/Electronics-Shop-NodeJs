import express from 'express';
import fetch from 'node-fetch';
const server = express();


const PORT = process.env.PORT || 5000;
server.set('view engine', 'ejs');
server.use(express.static('Assets'));
server.set('views', 'View');

server.listen(PORT, console.log(`Server started on port ${PORT}`));


server.get("/", (req, res) => {
    res.render('home');
})

server.get("/home", (req, res) => {
    res.render('home');
})

server.get("/favorite", (req, res) => {
    res.render('favorite');
})

server.get("/cart", (req, res) => {
    res.render('cart');
})

server.get("/contact", (req, res) => {
    res.render('contact');
})

server.get("/products?:p_id", (req, response) => {
    if (!req.query.p_id) {
        fetch('https://dummyjson.com/products?select=title,price,rating,discountPercentage,thumbnail')
            .then(res => res.json())
            .then(res => response.render('product-list', { Products: res.products }))
    } else {

        fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price,rating,discountPercentage,thumbnail')
            .then(res => res.json())
            .then(r => {
                fetch('https://dummyjson.com/products/' + req.query.p_id)
                    .then(res => res.json())
                    .then(res => response.render('product-details', { Product: res, Products: r.products }))
            })

    }
})

server.get("/account", (req, res) => {
    res.render('account');
})

server.get("/checkout", (req, res) => {
    res.render('checkout');
})

server.get("/login", (req, res) => {
    res.render('login');
})