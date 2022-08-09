var express = require('express');
var router = express.Router();

var recipeModel = require('../models/recipes')
var userModel = require("../models/users");



router.post("/check-author", async function (req, res, next) {
	var myAccount = await userModel
		.findOne({ token: req.body.token })
		.populate("addedRecipes")
		.populate("likedRecipes")
		.exec()

	var AmITheAuthor = false
	myAccount.addedRecipes.includes(req.body._id) ?
	AmITheAuthor = true :
	AmITheAuthor = false

	res.json({ AmITheAuthor });
});



router.post('/like-recipe', async function (req, res, next) {

	var likedRecipe = await recipeModel.findOne({ _id: req.body.id });
	likedRecipe.likeCount = Number(likedRecipe.likeCount) + 1
	likedRecipeSaved = await likedRecipe.save();
	
	var user = await userModel.findOne({ token: req.body.token })
	user.likedRecipes.push(likedRecipeSaved._id);
	userSaved = await user.save();
	
	
	res.json({likedRecipes: userSaved.likedRecipes, likeCount: likedRecipeSaved.likeCount});
});

router.post('/dislike-recipe', async function (req, res, next) {

	var likedRecipe = await recipeModel.findOne({ _id: req.body.id });
	likedRecipe.likeCount = Number(likedRecipe.likeCount) - 1
	likedRecipeSaved = await likedRecipe.save();
	
	var user = await userModel.findOne({ token: req.body.token })
	var index = user.likedRecipes.findIndex(x => x == likedRecipeSaved._id)
	user.likedRecipes.splice(index, 1);
	userSaved = await user.save();
	
	res.json({likedRecipes: userSaved.likedRecipes, likeCount: likedRecipeSaved.likeCount});
});

router.post('/delete-recipe', async function (req, res, next) {

	var deleteRecipe= await recipeModel.deleteOne({ _id: req.body.id})

	var result = false
	if(deleteRecipe.deletedCount == 1){
		result = true
	  }
	res.json({result});
});


//ROUTE AJOUT A recipesAdded HOMESCREEN
//DONNEES ENTREES: req.body.idRecipe
//DONNEES SORTIE : result true false recette ajoutee a AddedList User en BDD
router.post('/add-recipe-to-myrecipes', async function (req, res, next) {

	var recipe = JSON.parse(req.body.recipe)	
	var user = await userModel.findOne({ token: req.body.token })
	user.addedRecipes.push(recipe._id);
	var newUser = await user.save()


	res.json({addedRecipes: JSON.stringify(newUser.addedRecipes)});
});


router.post('/delete-recipe-to-myrecipes', async function (req, res, next) {

	var recipe = JSON.parse(req.body.recipe)
	
	var user = await userModel.findOne({ token: req.body.token })

	var index = user.addedRecipes.findIndex(x => x == recipe._id)

	user.addedRecipes.splice(index, 1);

	var newUser = await user.save()


	res.json({addedRecipes: JSON.stringify(newUser.addedRecipes)});
});

router.post('/initial-fetch-recipesheet', async function (req, res, next) {

	var user = await userModel.findOne({ token: req.body.token })
	
	res.json({addedRecipes:user.addedRecipes,likedRecipes:user.likedRecipes});
});


//ROUTE AJOUT A LA SHOPPING LIST
//DONNEES ENTREE : ingedrients recette req.body.ingredients
// TRaitement BDD : ajout quantites globales dans BDD
//DONNEES SORTIE : [{ingredient:totalquantite}]
router.post('/addToShoppingList', async function (req, res, next) {

	console.log(req.body.recipe, 'hellooooooooooo');
	var recipe = JSON.parse(req.body.recipe)	
	var user = await userModel.findOne({ token: req.body.token })
	// var oldShoppingListeNames = user.shoppingList.filter(x=>x.name)
	// var oldShoppingListequantity = user.shoppingList.filter(x=>x.quantity)
	// var newShoppingListe = []
	recipe.ingredients.forEach(x => {
		// if (oldShoppingListe.includes()) {
			
		// }
		user.shoppingList.push({name:x.name, quantity:x.quantity})})


	var newUser = await user.save()

	res.json({shoppingList:newUser.shoppingList,});
});

router.post('/initial-fetch-shoppingList', async function (req, res, next) {

	var user = await userModel.findOne({ token: req.body.token })
	
	res.json({shoppingList:user.shoppingList});
})

//ROUTE AJOUT AU SEMAINIER
//DONNEES ENTREE : idrecette 
//DONNEES SORTIE : [liste recettes]
router.post('/addToWeeklyList', function (req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;