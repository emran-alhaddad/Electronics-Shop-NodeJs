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

server.get("/products?:cat", (req, response) => {
    var url = 'https://dummyjson.com/products';
    if (!req.query.cat)
        url += '?select=title,price,rating,discountPercentage,thumbnail';

    else
        url += '/category/' + req.query.cat;

    fetch('https://dummyjson.com/products/categories')
        .then(r2 => r2.json())
        .then(r2 => {
            fetch(url)
                .then(res => res.json())
                .then(res => response.render('product-list', { Products: res.products, Categories: r2 }))
        });
})


server.get("/products/:p_id?", (req, response) => {
    if (req.params.p_id) {
        fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price,rating,discountPercentage,thumbnail')
            .then(res1 => res1.json())
            .then(r1 => {
                fetch('https://dummyjson.com/products/categories')
                    .then(r2 => r2.json())
                    .then(r2 => {

                        fetch('https://dummyjson.com/products/' + req.params.p_id)
                            .then(res2 => res2.json())
                            .then(r3 => response.render('product-details', { Product: r3, Products: r1.products, Categories: r2 }))
                    })
            });

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