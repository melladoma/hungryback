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
	
	var user = await userModel.findOne({ token: req.body.token }).populate("likedRecipes");
	user.likedRecipes.push(likedRecipeSaved._id);
	userSaved = await user.save();
	var list = userSaved.likedRecipes.map(x=>x.id)
	
	res.json({likedRecipes: list, likeCount: likedRecipeSaved.likeCount});
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
	await user.save()

	res.json();
});


router.post('/delete-recipe-to-myrecipes', async function (req, res, next) {

	var recipe = JSON.parse(req.body.recipe)
	
	var user = await userModel.findOne({ token: req.body.token })

	var index = user.addedRecipes.findIndex(x => x == recipe._id)

	user.addedRecipes.splice(index, 1);

	await user.save()

	res.json();
});

router.post('/initial-fetch-recipesheet', async function (req, res, next) {

	var user = await userModel.findOne({ token: req.body.token })
	
	res.json({addedRecipes:user.addedRecipes,likedRecipes:user.likedRecipes});
});


//ROUTE AJOUT A LA SHOPPING LIST
//DONNEES ENTREE : ingedrients recette req.body.ingredients
// TRaitement BDD : ajout quantites globales dans BDD
//DONNEES SORTIE : [{ingredient:totalquantite}]
router.post('/addToShoppingList', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE AJOUT AU SEMAINIER
//DONNEES ENTREE : idrecette 
//DONNEES SORTIE : [liste recettes]
router.post('/addToWeeklyList', function (req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;