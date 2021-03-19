const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const saltRound = 10;

const userSignupRender = (req, res) => res.render("signup");

const userSignup = async (req, res) => {

  const { username, password: plainPass, email } = req.body;
  console.log(req.body);

  if (email && plainPass && username) {
    const password = await bcrypt.hash(plainPass, saltRound);

    //try  catch????
    const newUser = await User.create({
      username,
      password,
      email,
    });

    req.session.user = {
      id: newUser._id,
    };

    return res.redirect("/");
  }
  return res.status(418).redirect("/signup");

};

const userSigninRender = (req, res) => res.render("signin");

const userSignin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (username && password) {
    const currentUser = await User.findOne({ username });
    console.log({ currentUser });
    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      req.session.user = {
        id: currentUser._id,
      };

      return res.redirect("/adminPanel");
    }
    return res.status(418).redirect("/signin");
  }
  return res.status(418).redirect("/signin");

};

const userSignout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");

    res.clearCookie(req.app.get("cookieName"));
    return res.redirect("/");
  });
};

module.exports = {
  userSignupRender,
  userSignup,
  userSigninRender,
  userSignin,
  userSignout,
};
