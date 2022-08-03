var express = require('express');
var router = express.Router();
var RecipeModel = require('../models/recipes')
var UserModel = require('../models/users')
var uniqid = require('uniqid');
var fs = require('fs');
var request = require('sync-request')
var cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'cloud022',
	api_key: '252989959543114',
	api_secret: 'yRgI4lzdRpXEzwUrzgzbn5dXN4s'
});


router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

//---- ROUTE AFFICHAGE HOMESCREEN - GET => voir en USEEFFECT d'INITIALISATION 
//DONNEES d'ENTREE: token user
//TRAITEMENT : recherche BDD recipesAdded user
//DONNEES DE SORTIE:tableau de recettes du user [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
// router.get('/get-myrecipes', function (req, res, next) {
// 	res.send('respond with a resource');
// });

//----- ROUTE AFFICHAGE FEED - GET USEEFFECT d'INITIALISATION
//DONNEES d'ENTREE: /
//TRAITEMENT : recherche BDD recettes publiques
//DONNEES DE SORTIE:tableau de recettes publiques [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
router.get('/get-feed', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE VALIDATION FICHE RECETTE -POST ONPRESS

//DONNEES d'ENTREE: objet validatedForm{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,privateStatus}
//TRAITEMENT : envoi en BDD
//DONNEES DE SORTIE: result true/false sur enregistrement BDD recette
router.post('/upload-image', async function (req, res, next) {
	var filePath = './tmp/' + uniqid() + '.jpg'
	var resultCopy = await req.files.image.mv(filePath);
	if (!resultCopy) {
		var resultCloud = await cloudinary.uploader.upload(filePath);
		let resultObj = {
			imageUrl: resultCloud.url,
		}
		// console.log(resultObj)
		fs.unlinkSync(filePath);
		res.json({ result: true, message: 'File uploaded!', resultObj });
	} else {
		res.json({ result: false, message: resultCopy });
	}

});


router.post('/validate-form', async function (req, res, next) {
	//filtre les ingredients vides
	let ingredients = req.body.recipe.ingredients.filter(x => x.name !== "")
	//recherche l'auteur de la recette grace a son token
	var author = await UserModel.findOne({ token: req.body.userToken });

	//creation de la recette dans la BDD
	var newRecipe = new RecipeModel({
		name: req.body.recipe.name,
		directions: req.body.recipe.directions,
		author: author._id,
		servings: req.body.recipe.servings,
		prepTime: req.body.recipe.prepTime,
		cookTime: req.body.recipe.cookTime,
		tags: req.body.recipe.tags,
		image: req.body.recipe.image,
		ingredients: ingredients,
		likeCount: 0,
		privateStatus: req.body.recipe.privateStatus,
	})
	var recipeSaved = await newRecipe.save();

	//enregistrement de la recette dans les likes de l'auteur user en cle etrangere
	author.addedRecipes.push(recipeSaved._id)
	authorSaved = await author.save()

	var recipeToFront = {
		name: newRecipe.name,
		directions: newRecipe.directions,
		author: author.username,
		servings: newRecipe.servings,
		prepTime: newRecipe.prepTime,
		cookTime: newRecipe.cookTime,
		tags: newRecipe.tags,
		image: newRecipe.image,
		ingredients: newRecipe.ingredients,
		likeCount: 0,
		privateStatus: newRecipe.privateStatus,
	};

	let result = false;
	if (recipeSaved && authorSaved) {
		result = true;
		res.json({ result, recipeToFront });
	} else {
		res.json({ result })
	}

});
module.exports = router;


//ROUTE SHOPP
