var mongoose = require("mongoose");

var ingredientSchema = mongoose.Schema({
	name: String,
	quantity: String,
});

var authorSchema = mongoose.Schema({
	username: String,
	token: String,
});

var commentSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	date: Date,
	content: String,
});

var recipeSchema = mongoose.Schema({
	name: String,
	ingredients: [ingredientSchema],
	directions: String,
	servings: Number, //pour combien de personnes
	prepTime: String, //en minutes
	cookTime: String, //en minutes
	tags: Array, //tableau de strings
	author: authorSchema, //personne qui l'a importé ou créé dans hungrybook, et pas le cuisinier qui l'a inventé
	image: String, //url
	comments: [commentSchema],
	likeCount: Number, //nb de likes
	privateStatus: Boolean, //apparait dans le feed ou pas
});

module.exports = mongoose.model("recipes", recipeSchema);