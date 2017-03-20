const Product = require('../models/product');

getProduct = (req,res) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) {res.status(500).send({message: `Request error: ${err}`})}
    if (!product) {res.status(404).send({message: 'Product doesn\'t exists'})}

    res.status(200).send({product});
  });
}

getProducts = (req,res) => {
  Product.find({}, (err, products) => {
    if (err) {res.status(500).send({message: `Request error: ${err}`})}
    if (!products) {res.status(404).send({message: 'There are no producs'})}

    res.status(200).send({products});
  });
}

saveProduct = (req,res) => {
  console.log('POST /api/product\n',req.body);

  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

 product.save((err, productStored) => {
   if (err) {res.status(500).send({message: `Error when trying to create new product: ${err}`})}

   res.status(200).send({product: productStored});
 });
}

updateProduct = (req,res) => {
  let productId = req.params.productId;
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) {res.status(500).send({message: `Request error: ${err}`})}
    if (!productUpdated) {res.status(404).send({message: 'Product doesn\'t exists'})}

    res.status(200).send({productUpdated});
  });
}

deleteProduct = (req,res) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) {res.status(500).send({message: `Request error: ${err}`})}
    if (!product) {res.status(404).send({message: 'Product doesn\'t exists'})}

    product.remove(err => {
      if (err) {res.status(500).send({message: `Error deleting product: ${err}`})}
      res.status(200).send({message: 'Product deleted'});
    });
  });
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
