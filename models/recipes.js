var mongoose = require("mongoose");

var ingredientSchema = mongoose.Schema({
	name: String,
	quantity: Number,
});

var tagSchema = mongoose.Schema({
	name: String,
});

var commentSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: "addresses" },
	date: Date,
	content: String,
});

var recipeSchema = mongoose.Schema({
	name: String,
	ingredients: ingredientSchema,
	directions: String,
	servings: Number, //pour combien de personnes
	prepTime: Number, //en minutes
	cookTime: Number, //en minutes
	tags: tagSchema, //tableau de strings
	author: { type: mongoose.Schema.Types.ObjectId, ref: "addresses" }, //personne qui l'a importé ou créé dans hungrybook, et pas le cuisinier qui l'a inventé
	image: String, //url
	comments: commentSchema,
	likeCount: Number, //nb de likes
	privateStatus: Boolean, //apparait dans le feed ou pas
});

module.exports = mongoose.model("recipes", recipeSchema);
