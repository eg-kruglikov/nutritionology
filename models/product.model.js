const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	// Название продукта
	name: {
		type: String,
		required: true,
		minlength: 2,
	},
	// Калорийность, БЖУ, порция
	calories: Number,
	proteins: Number,
	fats: Number,
	carbohydrates: Number,
	serving: Number,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
