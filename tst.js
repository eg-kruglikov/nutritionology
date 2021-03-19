// const express = require("express")
// const app = express()
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const Product = require("./models/product.model")
const User = require("./models/user.model")

async function hop() {
  await Product.create({
    name: "milk",
    calories: 3,
    proteins: 6,
    fats: 4,
    carbohydrates: 62,
    serving: 6,
  })
  await Product.create({
    name: "apple",
    calories: 3,
    proteins: 6,
    fats: 4,
    carbohydrates: 62,
    serving: 6,
  })
  await Product.create({
    name: "mellon",
    calories: 3,
    proteins: 6,
    fats: 4,
    carbohydrates: 62,
    serving: 6,
  })
  await Product.create({
    name: "qiwi",
    calories: 3,
    proteins: 6,
    fats: 4,
    carbohydrates: 62,
    serving: 6,
  })
}

hop()
// console.log("SERVER connected to port >> ", PORT)

mongoose.connect(
  "mongodb://localhost:27017/nutritionism",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connection to DATABASE is successful.")
  }
)
