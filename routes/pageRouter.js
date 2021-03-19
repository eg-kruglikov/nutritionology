const pageRouter = require("express").Router();
const {
  userSignupRender,
  userSignup,
  userSigninRender,
  userSignin,
  userSignout,
} = require("../controller/pageController");

const {
  adminPanelRender,
  adminNewProduct,
  adminProductDelete,
  adminEditProduct,
  addNewProduct,
  changeEditedProduct,
  productSelector,
} = require("../controller/adminController");

pageRouter.get("/", (req, res) => {
  res.render("home");
});

// pageRouter.get("/adminPanel", (req, res) => {
//   res.render("adminPanel")
// })

// pageRouter.get("/product", (req, res) => {
//   res.render("newProduct")
// })

pageRouter.route("/signup").get(userSignupRender).post(userSignup);

pageRouter.route("/signin").get(userSigninRender).post(userSignin);

pageRouter.route("/signout").get(userSignout);

pageRouter.route("/adminPanel").get(adminPanelRender);

pageRouter.route("/newProduct").get(adminNewProduct);

pageRouter.route("/productDelete/:id").delete(adminProductDelete);

pageRouter.route("/productEdit/:id").get(adminEditProduct);

pageRouter.route("/productAdd").post(addNewProduct);

pageRouter.route("/productSelector").get(productSelector);

module.exports = pageRouter;
