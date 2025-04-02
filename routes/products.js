const express = require('express');
const router = express.Router();
const data = require('../data.js');
// const products = data.products;
router.get('/', (req, res) => {
  if (data.products) res.json(data.products);
  else res.status(404).json({ message: `no products` });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const prod = data.products.find(item => item.id === parseInt(id));
  if (prod) res.json(prod);
  else res.status(404).json({ message: `no product with this id` });
});

router.post('/', (req, res) => {
  const prod = req.body;
  console.log(prod.id);
  let result = false;
  for (let i = 0; i < data.products.length; i++) {
    console.log(data.products[i].id, parseInt(prod.id));
    if (data.products[i].id === parseInt(prod.id)) result = true;
  }

  console.log(result);
  if (result) res.status(400).json({ message: `This product already exists` });
  else if (prod.name && prod.price > 0 && prod.stock > 0) {
    data.products.push(prod);
    console.log(data.products);
    res.status(201).json({ message: `The product was Added` });
  } else
    res
      .status(401)
      .json({ message: `you must enter right values and all the properties` });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const info = req.body;
  const prod = data.products.find(item => item.id === parseInt(id));
  console.log(prod);
  if (prod) {
    if (info.name)
      data.products.forEach(item => {
        if (item.id === parseInt(prod.id)) item.name = info.name;
      });
    if (info.price)
      data.products.forEach(item => {
        if (item.id === parseInt(prod.id)) item.price = info.price;
      });
    if (info.stock)
      data.products.forEach(item => {
        if (item.id === parseInt(prod.id)) item.stock = info.stock;
      });
    console.log(data.products);
    res.status(201).json({ message: `This product is updated` });
  } else res.status(400).json({ message: `This product does not exists` });
  // if (prod) res.status(201).json({ message: `product updated` });
  // else res.status(404).json({ message: `no product with this id` });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const prod = data.products.find(item => item.id === parseInt(id));
  if (prod) {
    data.products.splice(
      data.products.findIndex(item => item.id === parseInt(id)),
      1,
    );
    console.log(data.products);
    res.status(400).json({ message: `This product is deleted` });
  } else res.status(404).json({ message: `no product with this id` });
});
module.exports = router;
