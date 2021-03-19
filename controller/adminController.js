const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Product = require("../models/product.model");

const saltRound = 10;

const adminPanelRender = async (req, res) => {
  const product = await Product.find();

  // return res.json(allProducts)

  res.render("adminPanel", { product });
  // console.log(product)
};

const adminNewProduct = (req, res) => {
  res.render("newProduct");
};

const adminEditProduct = async (req, res) => {
  const recievedID = req.params.id;
  console.log("EDIT FORM ID INCOME +++++>>>>>", recievedID);
  recievedProduct = await Product.findOne({ _id: recievedID });
  console.log("EDIT FORM RECIEVED FROM DB ===>>>>", recievedProduct);
  res.render("editProduct", { recievedProduct });
};

// const adminEditProduct = async (req, res) => {
//   const recievedID = req.params.id
//   recievedProduct = await Product.findOne({ _id: recievedID })
//   console.log("EDIT RECIEVED ===>>>>", recievedProduct)
//   return res.sendStatus(200)
// }

const adminProductDelete = async (req, res) => {
  const recievedID = req.params.id;
  console.log("ДеЛИТ ПРИНЯЛ!", recievedID);
  await Product.findByIdAndDelete(recievedID);
  return res.sendStatus(200);
};

const addNewProduct = async (req, res) => {
  console.log("add NEW =======>>>>", req.body);

  let tempProduct = await Product.create(req.body.product);
  console.log("СОЗДАННЫЙ ПРОДУКТ", tempProduct);

  res.redirect("/adminPanel");
};

const changeEditedProduct = async (req, res) => {
  console.log(
    "CHANGE INCOME PRODUCT ID =======>>>>",
    req.body.product.id + "\n"
  );
  // let tempProduct = await Product.findById(req.body.product.id)
  // console.log("TEMPPROD----->>", tempProduct)
  // tempProduct = await Product.updateOne(req.body.product)
  // console.log("ОБНОВЛЕНННЫЙ ПРОДУКТ -->>", tempPro duct)
  // res.redirect("/adminPanel")

  console.log(req.body.product.name);
  const c = await Product.findByIdAndUpdate(req.body.product.id, {
    name: req.body.product.name,
    calories: req.body.product.calories,
    proteins: req.body.product.proteins,
    fats: req.body.product.fats,
    carbohydrates: req.body.product.carbohydrates,
    serving: req.body.product.serving,
    function(err, prod) {
      console.log(prod);
    },
  });
  // console.log(c)
  res.redirect("/adminPanel");

  // await Product.create(req.body.product)
  // res.redirect("/adminPanel")
};
const productSelector = async (req, res) => {
  const prod = await Product.find();
  if (prod) {
    res.json(prod);
  } else {
    res.sendStatus(500);
  }
};

module.exports = {
  adminPanelRender,
  adminNewProduct,
  adminProductDelete,
  adminEditProduct,
  addNewProduct,
  productSelector,
};
