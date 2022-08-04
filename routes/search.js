var express = require("express");
var router = express.Router();

var recipeModel = require("../models/recipes");
var userModel = require("../models/users");

router.post("/initial-fetch-myrecipes", async function (req, res, next) {

	var myAccount = await userModel
		.findOne({ token: req.body.token })
		.populate("addedRecipes")
		.populate("likedRecipes")
		.exec()

	let addedRecipes = myAccount.addedRecipes.reverse()
	let likedRecipes = myAccount.likedRecipes.reverse()

	res.json({
		addedRecipes: addedRecipes,
		likedRecipes: likedRecipes,
	});
});

module.exports = router;

router.post("/initial-fetch-feedrecipes", async function (req, res, next) {
	let allRecipes = await recipeModel.find();
	let allPublicRecipes = allRecipes.filter((x) => x.privateStatus === false);
	allPublicRecipes.reverse()

	res.json({ allPublicRecipes });
});

module.exports = router;




//des aides mémoires que je garde pour l'instant:

//---- ROUTE RECHERCHE PAR TAGS - GET onPress
//DONNEES d'ENTREE: tableau de chips/tags selected
//DONNEES DE SORTIE:tableau de recettes qui contiennent ces tags [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
/* router.post("/search-tags", async function (req, res, next) {
	var recipes;
	if (JSON.parse(req.body.tags).length === 0) {
		recipes = await recipeModel.find();
	} else {
		version aggregate:
		 var aggregate = recipeModel.aggregate();
		aggregate.match({ "tags": { "$all": JSON.parse(req.body.tags) } });
		recipes = await aggregate.exec();

		version qui trouve les recettes qui ont obligatoirement TOUS les elements du tableau:
		recipes = await recipeModel.find({ "tags": { "$all": JSON.parse(req.body.tags) } })
	}

	res.json({ recipes });
});  */

//---- ROUTE RECHERCHE TEXTUELLE - POST sur TouchableOpacity Magnify
//DONNEES d'ENTREE: req.body.searchItem (string)
//traitement : recherche BDD sur searchItem dans direction/ingredients/title
//DONNEES DE SORTIE:tableau de recettes qui contiennent le searchItem dans direction/ingredients/title [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
/* router.post("/search-input", async function (req, res, next) {
	//recettes feed
	console.log(req.body.input)
	var listAuthor = []
	var recipesByName = []
	var recipesByIngredients = []
	var recipesByDirections = []
	if (req.body.input.length === 0) {
		recipesByName = await recipeModel.find()
	} else {
		
		listAuthor = (await userModel.find()).map(x=>x.username)
		newListAuthor = listAuthor.filter(x=>x.indexOf(req.body.input) === 0 ) //filtrer si ca correspond à la lettre
		console.log(listAuthor)
		

		
		let regex = new RegExp(req.body.input, 'i')
	recipesByName = await recipeModel.find({ name: reg });
	console.log(recipesByName)
	recipesByIngredients = await recipeModel.find({ ingredients: { "$all": reg } });
	recipesByDirections = await recipeModel.find({ directions: reg });
	}
	

	res.json({ recipesByName, listAuthor: JSON.stringify(newListAuthor), recipesByDirections });
}); */



